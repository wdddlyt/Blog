from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
import markdown
from django.utils.html import mark_safe
# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length=20)
    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=30)
    def __str__(self):
        return self.name




class Article(models.Model):
    #主题
    title = models.CharField(max_length=200)

    #简介,blank = True 表示允许为空
    introduction = models.CharField(max_length=200, blank=True)

    #内容
    content = models.TextField()

    #封面图片名
    title_image = models.ImageField(upload_to='blog/', blank=True)

    #点赞数
    like_count = models.IntegerField(default=0)

    #阅读数
    readed_count = models.IntegerField(default=0)

    #创建时间
    create_time = models.DateTimeField(auto_now_add=True)

    #最后更新时间
    update_time = models.DateTimeField()

    #作者
    created_by = models.ForeignKey(User, related_name='article')

    #分类
    category_at = models.ForeignKey(Category,related_name='article',blank=True)

    # #评论
    # post = models.ForeignKey(Visitor,related_name='article', blank=True)

    #标签
    tags = models.ManyToManyField(Tag, blank=True)



    def get_content_as_markdown(self):
        return mark_safe(markdown.markdown(self.content,
        extensions=['markdown.extensions.fenced_code',
                    'markdown.extensions.codehilite'],
        safe_mode='escape',
        ))
    @property
    def category_name(self):
        return self.category_at.name

    @property
    def visitor(self):
        return self.post.name

    @property
    def post_data(self):
        return self.post.reply

    @property
    def post_time(self):
        return self.post.create_time

    def get_absolute_url(self):

        return reverse('blog:info', kwargs={'pk':self.pk, 'ucategory':self.category_name})



class Visitor(models.Model):
    name = models.CharField(max_length=20)
    create_time = models.DateTimeField(auto_now_add=True)
    reply = models.TextField(max_length=1000)
    article = models.ForeignKey(Article,related_name='visitor')