var express = require('express')
    app = express.createServer()

/*
 * Configuration
 */
app.configure(function() {
    app.use(express.static(__dirname + '/public'))
    app.use(express.bodyParser())
    app.use(express.methodOverride())
})

app.configure('development', function() {
    app.use(express.logger())
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }))
})


/*
 * GET /
 * Returns the index.html page which holds the basic mustache templates for
 * visits and posts.
 */
app.get('/', function(req, res) {
    res.send('Hello World!')
})


/*
 * GET /posts
 * Returns a list of the last 20 posts. Allows to submit a page param to modify
 * the result listing.
 */
app.get('/posts', function(req, res) {
    res.send('Posts')
})


/*
 * POST /posts
 * Creates a now post.
 */
app.post('/posts', function(req, res) {
    res.send('Create Post')
})


/*
 * PUT /posts/:id
 * Modifies a post.
 */
app.put('/posts/:id', function(req, res) {
    res.send('Modify Post')
})


/*
 * DELETE /posts/:id
 * Deletes a post.
 */
app.del('/posts/:id', function(req, res) {
    res.send('Delete Post')
})


/*
 * PUT /users/:id
 * Modifies a user.
 */
app.put('/users/:id', function(req, res) {
    res.send('Modify user')
})


/*
 * GET /login
 * Shows the login page. Redirects to / if user is already authorized.
 */
app.get('/login', function(req, res) {
    res.send('Get Login')
})


/*
 * POST /login
 * Autorizes a user if allowed. Redirects to /login if not.
 */
app.post('/login', function(req, res) {
    res.send('Post Login')
})



app.listen(process.env.PORT || 1982)
