from django.shortcuts import render,get_object_or_404,redirect
from django.http import HttpResponse
from blog.models import Category,Article,Visitor
from django.views.generic import View,ListView
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Count
from .form import CommentForm

# Create your views here.


class IndexView(View):
    def get(self,request):
        articles = Article.objects.all().order_by('-id')


        return render(request, 'blog_new/index.html', context={
            'articles':articles
        })


class ArticlestListView(View):
    def get(self, request,ucategory):
        queryset = Article.objects.filter(category_at__name__exact=ucategory).order_by('-id')
        page = request.GET.get('page', 1)

        paginator = Paginator(queryset, 20)

        try:
            articles = paginator.page(page)
        except PageNotAnInteger:
            # fallback to the first page
            topics = paginator.page(1)
        except EmptyPage:
            # probably the user tried to add a page number
            # in the url, so we fallback to the last page
            articles = paginator.page(paginator.num_pages)

        return render(request, 'blog_new/list.html', context={
           'articles':articles,
           #  'topics':topics

        })



class InfoView(View):
    def get(self, request, ucategory, pk ):
        article = get_object_or_404(Article,pk=pk)
        visitors = article.visitor.all().order_by('-create_time')
        form = CommentForm()
        # print(visitors)
        # article.content = markdown.markdown(
        #     article.content,
        #     extension=[
        #     'markdown.extensions.extra',
        #     'markdown.extensions.codehilite',
        #     'markdown.extensions.toc',
        #     'markdown.extensions.fenced_code'
        #     ],
        # )
        return render(request, 'blog_new/info.html', context={
            'article':article,
            'form':form,
            'visitors':visitors
        })

    def post(self,request,pk,ucategory):
        article = get_object_or_404(Article,pk=pk)

        form = CommentForm(request.POST)
        if form.is_valid():
            # 检查到数据是合法的，调用表单的 save 方法保存数据到数据库，
            # commit=False 的作用是仅仅利用表单的数据生成 Comment 模型类的实例，但还不保存评论数据到数据库。
            comment = form.save(commit=False)

            # 将评论和被评论的文章关联起来。
            comment.article =article

            # 最终将评论数据保存进数据库，调用模型实例的 save 方法
            comment.save()

            # 重定向到 post 的详情页，实际上当 redirect 函数接收一个模型的实例时，它会调用这个模型实例的 get_absolute_url 方法，
            # 然后重定向到 get_absolute_url 方法返回的 URL。
            return redirect(article)


class TextView(View):
    def get(self,request):
        article = get_object_or_404(Article, pk=3)
        return render(request, 'blog/text.html',context={
            'article': article
        })

class  SearchView(View):
    def get(self,request):
        search_txt = request.GET.get('searchtxt')
        articles = Article.objects.filter(title__contains=search_txt)
        return render(request, 'blog_new/search_list.html', context={
            'articles':articles
        })