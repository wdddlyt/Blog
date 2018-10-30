from django.contrib import admin
from .models import Category,Article,Tag,Visitor


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name',]

class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'create_time', 'created_by', 'category_at',]

class TagAdmin(admin.ModelAdmin):
    list_display = ['name']

class VisitorAdmin(admin.ModelAdmin):
    list_display = ['name', 'create_time', ]

admin.site.register(Category, CategoryAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Visitor,VisitorAdmin)