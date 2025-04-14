from django.shortcuts import render
import requests
import json 
from django.http import JsonResponse
from django.shortcuts import render
from allauth.socialaccount.models import SocialAccount, SocialToken
from django.contrib.auth.models import User



# Create your views here.
def profile(request):
    user = request.user
    try:
        social_account = SocialAccount.objects.get(user=user)
        provider = social_account.provider  
    except SocialAccount.DoesNotExist:
        provider = 'local'  

# TWITTER RENDERING    
    if provider == 'twitter':
        twitter_tokens = get_twitter_tokens_by_username(request.user.username)
        if "error" in twitter_tokens:
            return render(request, 'profile.html')
        
        
        context = twitter_tokens
        if twitter_tokens.get("provider") == 'twitter':
            return render(request, 'dashboard/twiter.html', context)

# GIT  HUB RENDERING
    elif provider == 'github':
        github_data = get_github_data(request.user.username)
        url = github_data.get("profile", {}).get("bio")
        print("url",url)
        context = github_data
        return render(request, 'dashboard/test.html', context)
    


    else:
        pass
    
    return render(request, 'profile.html',context)


def home(request):
    return render(request, 'index.html')







def get_github_data(username):
    print("username", username)
    base_url = f"https://api.github.com/users/{username}"

    # Get profile info
    profile = requests.get(base_url).json()

    # Get public repositories
    repos = requests.get(f"{base_url}/repos").json()

    # Extract stars and repo info
    repo_data = []
    for repo in repos:
        repo_data.append({
            'name': repo['name'],
            'stars': repo['stargazers_count'],
            'forks': repo['forks_count'],
            'url': repo['html_url']
        })

    context = {
        'username': username,
        'profile': {
            'name': profile.get('name'),
            'bio': profile.get('bio'),
            'followers': profile.get('followers'),
            'following': profile.get('following'),
            'public_repos': profile.get('public_repos'),
            'avatar': profile.get('avatar_url'),
            'url': profile.get('html_url'),
            'location': profile.get('location'),
            'avatar_url': profile.get('avatar_url'),
        },
        'repos': repo_data
    }
    
    return context



def get_twitter_tokens_by_username(username):
    try:
        user = User.objects.get(username=username)
        social_account = SocialAccount.objects.get(user=user, provider='twitter')
        extra_data = social_account.extra_data
        provider = social_account.provider
        print("provider",provider)
        return {
            "extra_data": extra_data,
            "provider": provider
        }
    except User.DoesNotExist:
        return {"error": "User not found"}
    except SocialAccount.DoesNotExist:
        return {"error": "Twitter account not linked"}
    except SocialToken.DoesNotExist:
        return {"error": "Twitter token not found"}






