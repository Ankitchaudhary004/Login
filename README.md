Django Social Login with Allauth (Twitter & GitHub)
A Django web app that implements secure and user-friendly social login using Django-Allauth,
integrated with Twitter and GitHub. This project demonstrates industry-standard authentication
practices and is ideal for scalable, OAuth-compliant user management.
Features:
- Social login with Twitter and GitHub
- Secure OAuth2.0 integration
- Clean and modular Django project structure
- Automatic user creation on first login
- Customizable login and redirect flows
Tech Stack:
- Backend: Django 4.x
- Authentication: django-allauth
- OAuth Providers: Twitter, GitHub
- Database: SQLite (dev)
- Frontend: HTML, Bootstrap
- Others: Python 3.x, pip, virtualenv
Setup Instructions:
1. Create and Activate Virtual Environment:
python -m venv myenv
2. source \myenv\Scripts\activate)
3. Install Dependencies:
 pip install -r requirements.txt
4. Configure ADMIN :
admin/Social Applications=your_github_client_id
admin/Social Applications=your_github_client_secret
admin/Social Applications=your_twitter_api_key
admin/Social Applications=your_twitter_api_secret
5. Run Migrations:
python manage.py migrate
6. Create Superuser (optional):
python manage.py createsuperuser
7. Run Server:
python manage.py runserver
OAuth Setup Guide:
GitHub:
- GitHub Developer Settings -> New OAuth App
- Callback URL: http://localhost:8000/accounts/github/login/callback/
Twitter:
- Twitter Developer Portal -> New App
- Callback URL: http://localhost:8000/accounts/twitter/login/callback/
Django Configuration (settings.py):
INSTALLED_APPS = [..., 'django.contrib.sites', 'allauth', 'allauth.account',
'allauth.socialaccount', 'allauth.socialaccount.providers.github',
'allauth.socialaccount.providers.twitter']
SITE_ID = 1
AUTHENTICATION_BACKENDS = [
'django.contrib.auth.backends.ModelBackend',
'allauth.account.auth_backends.AuthenticationBackend',
]
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'



NOTE:
All data fetching in this project is done using publicly available and free APIs from
platforms like Twitter and GitHub. No paid APIs were used. I also attaching a video of
Running project. I have removed all the essential keys, you have to add these keys to
run the project
