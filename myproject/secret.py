AWS_STORAGE_BUCKET_NAME = 'learndeepdive'
AWS_ACCESS_KEY_ID = 'AKIAIVJ2WZWX3HSAQESQ'
AWS_SECRET_ACCESS_KEY = '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'

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "!0%hy+&1*3%&jn-@_-(3j)^g1gazb+8^&ds8#3(@^8^nq_7=0u"

# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

"""
#for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

"""
# for deployment: learndeepdive
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'dehj4pksdu060c',
        'USER': 'uapimyobhggbww',
        'PASSWORD': 'Lo5jZbbVVgF9prc6bWxvyykISf',
        'HOST': 'ec2-54-204-8-138.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}

EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.privateemail.com'
EMAIL_PORT = 25
EMAIL_HOST_USER = 'invites@deepdive.us'
EMAIL_HOST_PASSWORD = ']bebickheEF8]'
EMAIL_USE_TLS = False