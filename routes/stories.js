const express = require('express')
const { restart } = require('nodemon')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')


//@Description - Show add page 
//@route   GET/ stories/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add')
})

//@Description - Show add page 
//@route   GET/ stories/add
// router.get('/add', ensureAuth, (req, res) => {
//     res.render('stories/add')
// })


//@Description - Process add form (create stories)
//@route   POST /stories
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Story.create(req.body)
    res.redirect('/dashboard')
  } catch {
    console.log(err)
    res.render('error/500')
  }
})


//@Description - Show all public stories
//@route   GET/ stories/add
router.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')      //to know about 'populate',watch this -https://youtu.be/VuSt5-AwL8Y ). Basically Within 'storySchema',we want to populate or occupy the datas from 'userSchema' also
      .sort({ createdAt: 'desc' })    //'desc' means descending order
      .lean()

    res.render('stories/index', {
      stories,
    })
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }

})

//@Description - Show single story page 
//@route   GET/ stories/:Id
router.get('/:Id', ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.Id).populate('user').lean()

    if (!story) {
      return res.render('error/404')
    }

    // if (story.user._Id != req.user.id && story.status == 'private') {
    //   res.render('error/404')
    // } else {
    //   res.render('stories/show', {
    //     story,
    //   })
    // }

    res.render('stories/show',{
      story,
    })

  } catch (err) {
    console.log(err)
    res.render('error/404')
  }
})

//@Description - Show edit page 
//@route   GET/ stories/edit/:id             //'id' of that particualr story,which we want to edit

router.get('/edit/:Id', ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({
      _Id: req.params.id,
    }).lean()

    if (!story) {
      return res.render('error/404')
    }

    if (story.user != req.user.id) {
      res.redirect('/stories')              //redirected to the 'public stories' page
    } else {
      res.render('stories/edit', {
        story,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})


// @Description - Update story
// @route   PUT/ stories/:id
router.put('/:Id', ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.Id).lean()

    if (!story) {
      return res.render('error/404')
    }

    if (story.user != req.user.id) {
      res.redirect('/stories')              //redirected to the 'public stories' page
    } else {
      story = await Story.findOneAndUpdate({ _Id: req.params.Id }, req.body, {
        new: true,
        runValidators: true,   //make sure that the mongoose fields are valid
      })

      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }

})

//@Description - Delete story
//@route   DELETE /stories/:id
router.delete('/:Id', ensureAuth, async (req, res) => {
  try {
    await Story.findOneAndDelete({ _Id: req.params.Id })
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})


//@Description - User stories 
//@route   GET/ stories/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.params.userId,
      status: 'public'
    }).populate('user').lean()

    res.render('stories/index', {         //it render the 'index.hbs'
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router