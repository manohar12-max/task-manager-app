from django.db import models

# Create your models here.
from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    effort_to_complete_task = models.IntegerField()
    due_date = models.DateField()
    user_id = models.IntegerField()  # Comes from token
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title