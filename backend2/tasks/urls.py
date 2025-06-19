from django.urls import path
from .views import TaskListCreateView, TaskUpdateDeleteView ,TaskExportView

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskUpdateDeleteView.as_view(), name='task-update-delete'),
    path('tasks/export/', TaskExportView.as_view(), name='task-export'),

]
