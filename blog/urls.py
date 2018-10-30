from django.conf.urls import url

from . import views

app_name = 'blog'

urlpatterns = [
    url(r'^$', views.IndexView.as_view(),name='index'),
    # url(r'^info/$', views.InfoView.as_view(), name='info')
    url(r'^text', views.TextView.as_view(),name='text'),
    url(r'^blog/search_list/$', views.SearchView.as_view(), name='search'),
    url(r'^blog/(?P<ucategory>[\w\-\&]+)/$', views.ArticlestListView.as_view(), name='list'),
    url(r'^blog/(?P<ucategory>[\w\-\&]+)/(?P<pk>\d+)/$', views.InfoView.as_view(), name='info')
]