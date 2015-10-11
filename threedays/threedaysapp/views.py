import json
import urllib
import urllib2
import requests
import oauth2
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.shortcuts import render_to_response
from .forms import ExploreForm
from django.template import RequestContext
from secrets import *

access_token_url = 'https://foursquare.com/oauth2/access_token'
auth_url = 'https://foursquare.com/oauth2/authorize'
redirect_url = 'http://127.0.0.1:8000/main/callback'
explore_url = 'https://api.foursquare.com/v2/venues/explore'



def index(request):
    return render_to_response('index.html')

def main( request ):
    return render_to_response( 'login.html' )

def auth( request ):
    # build the url to request
    params = {'client_id' : FOURSQUARE_CLIENT_ID,
            'response_type' : 'code',
            'redirect_uri' : redirect_url }
    data = urllib.urlencode( params )
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
    response = requests.post(access_token_url,params)
    # data = urllib.urlencode( params )
    # req = urllib2.Request( access_token_url, data.encode('utf-8') )
    # req = urllib2.Request( access_token_url, data)

    # request the access_token
    # response = urllib2.urlopen( req )
    # print(response)
    # access_token = json.loads( response.read( ).decode('utf-8') )
    access_token = response.json()
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
    data = urllib.urlencode( params )
    url = 'https://api.foursquare.com/v2/users/self'
    full_url = url + '?' + data
    response = urllib.urlopen( full_url )
    response = response.read( ).decode('utf-8')
    user = json.loads( response )['response']['user']
    name = user['firstName']
    # show the page with the user's name to show they've logged in
    return render_to_response('done.html', {'name':name}, RequestContext(request))

def get_explore(self, **kwargs):
    # request = self.request
    # if request.method == 'POST':
    #     form = ExploreForm(request.POST)
    #     if form.is_valid():
    #         section = form.cleaned_data['section']
    # else:
    #     form = ExploreForm()
    params = { 'limit' : self.POST['limit'],
               'near' : self.POST['near'],
               'query' : self.POST['query'],
               'section' : self.POST['section'],
               'oauth_token' : self.session.get('access_token'),
               'v' : '20150927'}
    response = requests.get(explore_url,params)
    POIs = response.json()['response']['groups'][0]['items']
    output = {}
    output['NameA'] = POIs[0]['venue']['name']
    output['NameB'] = POIs[1]['venue']['name']
    output['NameC'] = POIs[2]['venue']['name']
    output['HoursA'] = POIs[0]['venue']['hours']['status']
    output['HoursB'] = POIs[1]['venue']['hours']['status']
    output['HoursC'] = POIs[2]['venue']['hours']['status']
    output['AddressA'] = POIs[0]['venue']['location']['address']
    output['AddressB'] = POIs[1]['venue']['location']['address']
    output['AddressC'] = POIs[2]['venue']['location']['address']
    output['WebsiteA'] = POIs[0]['venue']['url']
    output['WebsiteB'] = POIs[1]['venue']['url']
    output['WebsiteC'] = POIs[2]['venue']['url']



    return render(self, 'done.html', output)

def yelpexplore(self, **kwargs):
    base_url = 'api.yelp.com'
    search_path = '/v2/search/'
    url_params = {}
    url_params['term'] = 'tacos'
    url_params['location'] = 'San Francisco, CA'
    url = 'http://{0}{1}?'.format(base_url, urllib.quote(search_path.encode('utf8')))
    consumer = oauth2.Consumer(YELP_CONSUMER_KEY, YELP_CONSUMER_SECRET)
    oauth_request = oauth2.Request(method="GET", url=url, parameters=url_params)
    oauth_request.update(
        {
            'oauth_nonce': oauth2.generate_nonce(),
            'oauth_timestamp': oauth2.generate_timestamp(),
            'oauth_token': YELP_TOKEN,
            'oauth_consumer_key': YELP_CONSUMER_KEY
        }
    )
    token=oauth2.Token(YELP_TOKEN, YELP_TOKEN_SECRET)
    oauth_request.sign_request(oauth2.SignatureMethod_HMAC_SHA1(), consumer, token)
    signed_url = oauth_request.to_url()

    connection = urllib2.urlopen(signed_url, None)
    try:
        response = json.loads(connection.read())
    finally:
        connection.close()

    return render(self, 'index.html', response)
