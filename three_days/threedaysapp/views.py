import json
from django.core.urlresolvers import reverse
import urllib.parse
import urllib.request as urllib2
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext

FOURSQUARE_CLIENT_ID = 'ILHWMSLB5MTWPEVMKBKFH3WIJRQSPW5H4UT04JV3TTDPY2BE'
FOURSQUARE_CLIENT_SECRET = 'VK300PW2W2EYGXP0KX5L3GTHDXF1LNXTN4P2V2XZKF3OASAU'
access_token_url = 'https://foursquare.com/oauth2/access_token'
auth_url = 'https://foursquare.com/oauth2/authorize'
redirect_url = 'http://127.0.0.1:8000/main/callback'



def index(request):
    return render_to_response('index.html')

def main( request ):
    return render_to_response( 'login.html' )

def auth( request ):
    # build the url to request
    params = {'client_id' : FOURSQUARE_CLIENT_ID,
            'response_type' : 'code',
            'redirect_uri' : redirect_url }
    data = urllib.parse.urlencode( params )
    # redirect the user to the url to confirm access for the app
    return HttpResponseRedirect('%s?%s' % (auth_url, data))

def callback(request):
    # get the code returned from foursquare
    code = request.GET.get('code')

    # build the url to request the access_token
    params = { 'client_id' : FOURSQUARE_CLIENT_ID,
               'client_secret' : FOURSQUARE_CLIENT_SECRET,
               'grant_type' : 'authorization_code',
               'redirect_uri' : redirect_url,
               'code' : code}
    data = urllib.parse.urlencode( params )
    req = urllib.request.Request( access_token_url, data.encode('utf-8') )

    # request the access_token
    response = urllib.request.urlopen( req )
    print(response)
    access_token = json.loads( response.read( ).decode('utf-8') )
    access_token = access_token['access_token']

    # store the access_token for later use
    request.session['access_token'] = access_token

    # redirect the user to show we're done
    return HttpResponseRedirect(reverse( 'oauth_done' ) )

def done( request ):
    # get the access_token
    access_token = request.session.get('access_token')

    # request user details from foursquare
    params = { 'oauth_token' : access_token,
               'v' : '20150927'}
    data = urllib.parse.urlencode( params )
    url = 'https://api.foursquare.com/v2/users/self'
    full_url = url + '?' + data
    print (full_url)
    response = urllib.request.urlopen( full_url )
    response = response.read( ).decode('utf-8')
    print (response)
    user = json.loads( response )['response']['user']
    name = user['firstName']

    # show the page with the user's name to show they've logged in
    return render_to_response('done.html', {'name':name})

