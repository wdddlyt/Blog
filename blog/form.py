from django import forms
from .models import Visitor


class CommentForm(forms.ModelForm):
    class Meta:
        model = Visitor
        fields = ['name', 'reply']