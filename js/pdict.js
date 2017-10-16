"use strict";

var MORPH_URL = "http://www.perseus.tufts.edu/hopper/morph";

/**
 * Entry point
 */
$(document).ready(function(){
    //Allow language switching
    $('.langBut').unbind('click').click(function(){
        $('#langCheck').prependTo($(this));
        $('.langBut').removeClass('active btn-primary').addClass('btn-outline-secondary');
        $(this).removeClass('btn-outline-secondary').addClass('btn-primary active');
    });

    //bind listeners to search for the query
    $('#search').unbind('keydown').keydown(function(event){
        if(event.keyCode == 13) search();
    });
    $('#searchButton').unbind('click').click(search);
});

/**
 * The data recevied by the AJAX call to the morph tool
 * @param {Any} data 
 */
function resultReceived(result){
    result = result.replace(/<img[^>]*>/g,"");    
    //Take only the main column from the result page
    var mainColumn = $(result).find('#main_col').get(0);
    $(mainColumn).find('p').remove();
    addResult(mainColumn.innerHTML);  
}

/**
 * Adds the new data as a HTML string in a new wrapper element
 * @param {HTML} result 
 */
function addResult(result){
    $('#currentWord').html('<div class="justAdded col-md-12" style="display:none;"></div>');
    var justAdded = $('.justAdded');
    justAdded.removeClass('justAdded').html(result);
    justAdded.addClass('animated bounceInLeft');
    justAdded.fadeIn();

    $('#search').val('');
}

/**
 * Forwards the query to the perseus morph server
 */
function search(){
    $.ajax({
        url: getURL(),
        success: resultReceived
    });
}

/**
 * Returns the complete URL for this search query
 */
function getURL(){
    return MORPH_URL + getQuery() + getQueryLanguage();
}

/**
 * Returns the query that was represented in the search box
 */
function getQuery(){
    return ("?l=" + $('#search').val().trim());
}

/**
 * Returns the language selection state of the query
 */
function getQueryLanguage(){
    return ("&la=" + (($('.langBut.active').attr('id') === 'langLatin') ? 'la' : 'greek'));
}