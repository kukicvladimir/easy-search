# Reference jQuery
$ = jQuery

# Adds plugin object to jQuery
$.fn.extend
  easySearch: (options) ->
    # Default settings
    settings =
      getFiltersUrl: ""
      postFiltersUrl: ""
      getResultUrl: ""

    searchCriteria = ""
    criteria = {}

    settings = $.extend settings, options

    loadFilters = () ->
      #should be ajax call
      console.log "loading filters from" + settings.getFiltersUrl

      criteria = 
          priority: ["low","medium","high"]
          user:["Admin", "Power User", "Regular User"]
          type:["improvement", "bug", "feature"]

    saveSearchCriteria = () ->
      console.log "{"+searchCriteria+"}"
      console.log "saving filters to " + settings.postFiltersUrl

    loadResults = () ->
      console.log "loading data from " + settings.getResultUrl

    resetSearchCriteria = () ->
      @val("")
      loadResults()
      searchCriteria = ""

    getFacets = (el) ->
      $ul = $("<ul />", {
        id: "criteria"
        class: "dropdown-menu"
        role: "menu"
      })

      keys = Object.keys(criteria)
      for key in keys
        $li = $("<li />")
        $a = $("<a />", {id: key, text: key})
        $a.appendTo($li)
        $a.click ->
          $("ul#criteria").remove()
          $(getFacetValues(el, @.id)).appendTo("body")
        $li.appendTo($ul)
      
      return $ul

    getFacetValues = (el, selectedCriteria) ->
      $ul = $("<ul />", {
        id: "selected-criteria"
        class: "dropdown-menu"
        role: "menu"
      })

      keys = criteria[selectedCriteria]
      #add selected criteria as header
      $li = $("<li />", {class: "dropdown-header", text: selectedCriteria})
      $li.appendTo($ul)

      #list all items from selected criteria
      for key in keys
        $li = $("<li />")
        $a = $("<a />", {id: key, text: key})
        $a.appendTo($li)
        $a.click ->
          #append search criteria
          searchCriteria += ", " if searchCriteria != ""
          searchCriteria += selectedCriteria+":"+@.id
          #set the value of input element
          $(el).val(searchCriteria)
          loadResults()
          #remove dropdowns
          $("ul.dropdown-menu").remove()
        $li.appendTo($ul)

      #append with divider and back button
      $li = $("<li />", {class: "divider"})
      $li.appendTo($ul)
      $li = $("<li />")
      $a = $("<a />", {text: "back"})
      $a.click ->
        $("ul.dropdown-menu").remove()
        getFacets(el).appendTo("body")

      $a.appendTo($li)
      $li.appendTo($ul)
      
      return $ul

    return @each ()->
      el = $(@)
      criteria = loadFilters()
      
      $(el).click ->
        $("ul.dropdown-menu").remove()
        getFacets($(el)).appendTo("body")

      #add clearBtn button
      $clearBtn = $("<button/>", {type:"button", class:"btn btn-default", text: "clear"})
      $clearBtn.click ->
        resetSearchCriteria.call($(el))

      $saveBtn = $("<button/>", {type:"button", class:"btn btn-default", text: "save"})
      $saveBtn.click ->
        saveSearchCriteria()

      $(el).after($saveBtn)
      $(el).after($clearBtn)