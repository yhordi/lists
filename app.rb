require 'sinatra'
require 'sequel'
require "sinatra/json"


$DB = Sequel.sqlite('db')

get '/' do
  erb :'lists/index'
end

get '/lists' do
  lists = $DB[:lists].all
  json :lists => lists
end

get '/lists/:id' do
  @items = $DB[:items].where({list_id: params["id"]}).all
  @list = $DB[:lists].where({id: params["id"]}).first
  erb :'lists/show'
end

post '/lists/:id/items' do
  $DB[:items].insert(name: params["name"], list_id: params[:id])
  status 200
end

get '/search' do
  results = $DB[:items].where(Sequel.like(:name, "%#{params[:criteria]}%")).all
  json :results => results
end