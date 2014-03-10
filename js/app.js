(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    easySearch: function(options) {
      var criteria, getFacetValues, getFacets, loadFilters, loadResults, resetSearchCriteria, saveBtnFilters, searchCriteria, settings;
      settings = {
        getFiltersUrl: "",
        postFiltersUrl: "",
        getResultUrl: ""
      };
      searchCriteria = "";
      criteria = {};
      settings = $.extend(settings, options);
      loadFilters = function() {
        console.log("loading filters from" + settings.getFiltersUrl);
        return criteria = {
          priority: ["low", "medium", "high"],
          user: ["Admin", "Power User", "Regular User"],
          type: ["improvement", "bug", "feature"]
        };
      };
      saveBtnFilters = function() {
        console.log("{" + searchCriteria + "}");
        return console.log("saving filters to " + settings.postFiltersUrl);
      };
      loadResults = function() {
        return console.log("loading data from " + settings.getResultUrl);
      };
      resetSearchCriteria = function() {
        this.val("");
        loadResults();
        return searchCriteria = "";
      };
      getFacets = function(el) {
        var $a, $li, $ul, key, keys, _i, _len;
        $ul = $("<ul />", {
          id: "criteria",
          "class": "dropdown-menu",
          role: "menu"
        });
        keys = Object.keys(criteria);
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          $li = $("<li />");
          $a = $("<a />", {
            id: key,
            text: key
          });
          $a.appendTo($li);
          $a.click(function() {
            $("ul#criteria").remove();
            return $(getFacetValues(el, this.id)).appendTo("body");
          });
          $li.appendTo($ul);
        }
        return $ul;
      };
      getFacetValues = function(el, selectedCriteria) {
        var $a, $li, $ul, key, keys, _i, _len;
        $ul = $("<ul />", {
          id: "selected-criteria",
          "class": "dropdown-menu",
          role: "menu"
        });
        keys = criteria[selectedCriteria];
        $li = $("<li />", {
          "class": "dropdown-header",
          text: selectedCriteria
        });
        $li.appendTo($ul);
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          $li = $("<li />");
          $a = $("<a />", {
            id: key,
            text: key
          });
          $a.appendTo($li);
          $a.click(function() {
            if (searchCriteria !== "") {
              searchCriteria += ", ";
            }
            searchCriteria += selectedCriteria + ":" + this.id;
            $(el).val(searchCriteria);
            loadResults();
            return $("ul.dropdown-menu").remove();
          });
          $li.appendTo($ul);
        }
        $li = $("<li />", {
          "class": "divider"
        });
        $li.appendTo($ul);
        $li = $("<li />");
        $a = $("<a />", {
          text: "back"
        });
        $a.click(function() {
          $("ul.dropdown-menu").remove();
          return getFacets(el).appendTo("body");
        });
        $a.appendTo($li);
        $li.appendTo($ul);
        return $ul;
      };
      return this.each(function() {
        var $clearBtn, $saveBtn, el;
        el = $(this);
        criteria = loadFilters();
        $(el).click(function() {
          $("ul.dropdown-menu").remove();
          return getFacets($(el)).appendTo("body");
        });
        $clearBtn = $("<button/>", {
          type: "button",
          "class": "btn btn-default",
          text: "clear"
        });
        $clearBtn.click(function() {
          return resetSearchCriteria.call($(el));
        });
        $saveBtn = $("<button/>", {
          type: "button",
          "class": "btn btn-default",
          text: "save"
        });
        $saveBtn.click(function() {
          return saveBtnFilters();
        });
        $(el).after($saveBtn);
        return $(el).after($clearBtn);
      });
    }
  });

}).call(this);
