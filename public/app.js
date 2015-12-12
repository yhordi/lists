$(document).ready(function(){
  createLinks()
  bindSearchListener()
})

var appendLinks = function(data){
  $.each(data.lists, function(index, list) {
    var link = $("<a>", {href: "/lists/" + list.id, text:list.name})
    $('#container').prepend('<div>')
    $('#container').append(link)
    $('#container').append('<div>')
    bindLinkListenter(link, list.id)
  });
}

var createLinks = function(){
  $.ajax({
    url: '/lists',
    method: 'GET',
    dataType: 'JSON'
  }).done(function(response){
    appendLinks(response)
  })
}

var clear = function(element){
  $(element).html('')
}

var createItem = function(id){
  var url = '/lists/' + id + '/items'
  var data = $('#itemForm').serialize()
  $.ajax({
    method: 'POST',
    url: url,
    data: data
  }).done(function(response){
    clear($('#container'))
    getItems(id)
  })
}

var getItems = function(id) {
  $.ajax({
    method: 'GET',
    url: '/lists/' + id,
    dataType: 'html'
  }).done(function(response){
    $('#container').append(response)
    bindFormListener(id)
  })
}

var search = function(data){
  $.ajax({
    url: '/search',
    data: data,
    method: 'get'
  }).done(function(response){
    clear('#results')
    showSearchResults(response)
  })
}

var showSearchResults = function(data) {
  $.each(data.results, function(index, result){
    $('#results').prepend('<li>' + result.name + '</li>')
  })
}

var bindLinkListenter = function(element, id) {
  $(element).on('click', function(e){
    e.preventDefault()
    clear($('#container'))
    getItems(id)
  })
}

var bindFormListener = function(id){
  $('#itemForm').on('submit', function(e){
    e.preventDefault()
    createItem(id)
  })
}

var bindSearchListener = function(){
  $('#search').on('submit', function(e){
    e.preventDefault()
    var data = $(this).serialize()
    search(data)
  })
}