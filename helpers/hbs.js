const moment = require('moment')

module.exports ={
    formatDate : function (date,format) {
        return moment(date).format(format)
    },
    truncate: function (str, len) {                     //Truncate means to shorten something by removing part of it,                                    
        if (str.length > len && str.length > 0) {          //Here we 'truncate' the full stories into some short paragraph in 'dashboard' or 'public stories'
          let new_str = str + ' '
          new_str = str.substr(0, len)
          new_str = str.substr(0, new_str.lastIndexOf(' '))
          new_str = new_str.length > 0 ? new_str : str.substr(0, len)
          return new_str + '...'
        }
        return str
      },  
      stripTags: function (input) {                   //'stripTags' used to remove the Paragraph tag('<p> </p>') from the stories
        return input.replace(/<(?:.|\n)*?>/gm, '')
      },
      editIcon: function (storyUser, loggedUser, storyId, floating = true) {        //'editIcon' function is used to add the 'edit' icon in every story, for that this func. needs that story's user Id, Logged user's Id
        if (storyUser._id.toString() == loggedUser._id.toString()) {
          if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
          } else {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
          }
        } else {
          return ''
        }
      },
      select: function (selected, options) {      //When we go to edit any story,the 'select' function helps to maintain the previous 'status' of that story ('public' or 'private')
        return options
          .fn(this)
          .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
          )
          .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
          )
      },
}