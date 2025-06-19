from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'  

    
    def validate_effort_to_complete_task(self, value):
        if value <= 0:
            raise serializers.ValidationError("Effort must be a positive number.")
        return value

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title cannot be blank.")
        return value
