from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from .auth import verify_jwt_token 
import openpyxl
from openpyxl.styles import Font
from django.http import HttpResponse

class TaskListCreateView(APIView):
    def get(self, request):
        user = verify_jwt_token(request)
        if not user:
            return Response({'error': 'Unauthorized'}, status=401)

        tasks = Task.objects.filter(user_id=user['id'])
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = verify_jwt_token(request)
        if not user:
            return Response({'error': 'Unauthorized'}, status=401)

        data = request.data.copy()
        data['user_id'] = user['id']  # inject from token
        serializer = TaskSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class TaskUpdateDeleteView(APIView):
    def put(self, request, pk):
        user = verify_jwt_token(request)
        if not user:
            return Response({'error': 'Unauthorized'}, status=401)

        try:
            task = Task.objects.get(pk=pk, user_id=user['id'])
        except Task.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)

        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        user = verify_jwt_token(request)
        if not user:
            return Response({'error': 'Unauthorized'}, status=401)

        try:
            task = Task.objects.get(pk=pk, user_id=user['id'])
            task.delete()
            return Response(status=204)
        except Task.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)

class TaskExportView(APIView):
    def get(self, request):
        user = verify_jwt_token(request)
        if not user:
            return Response({'error': 'Unauthorized'}, status=401)

        tasks = Task.objects.filter(user_id=user['id'])

        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Tasks"

        
        headers = ['ID', 'Title', 'Description', 'Effort (days)', 'Due Date', 'Created At']
        ws.append(headers)
        for cell in ws[1]:
            cell.font = Font(bold=True)

        
        for task in tasks:
            ws.append([
                task.id,
                task.title,
                task.description,
                task.effort_to_complete_task,
                task.due_date.strftime("%Y-%m-%d"),
                task.created_at.strftime("%Y-%m-%d %H:%M")
            ])

        
        response = HttpResponse(
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=tasks.xlsx'
        wb.save(response)

        return response