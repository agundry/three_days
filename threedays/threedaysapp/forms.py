from django import forms

class ExploreForm(forms.Form):
    near = forms.CharField(label='near', max_length=100)
    section = forms.CharField(label='section', max_length=50)
    query = forms.CharField(label='query', max_length=50)
    limit = forms.CharField(label='limit', max_length=10)

