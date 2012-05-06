/*jslint node: true, sloppy: true, indent: 4 */

var express = require('express'),
    app = express.createServer(),
    pg = require('pg'),
    
    db_string = process.env.HEROKU_POSTGRESQL_BLACK_URL || 'tcp://dan@localhost/btsgroup',
    db = new pg.Client(db_string);

db.connect();

/*
 * Configuration
 */
app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

app.configure('development', function () {
    app.use(express.logger());
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});


/*
 * GET /
 * Returns the index.html page which holds the basic mustache templates for
 * visits and posts.
 */
app.get('/', function (req, res) {
    res.send('Hello World!');
});


/*
 * GET /posts
 * Returns a list of the last 20 posts. Allows to submit a page param to modify
 * the result listing.
 */
app.get('/posts', function (req, res) {
    res.send('Posts');
});


/*
 * POST /posts
 * Creates a now post.
 */
app.post('/posts', function (req, res) {
    res.send('Create Post');
});


/*
 * PUT /posts/:id
 * Modifies a post.
 */
app.put('/posts/:id', function (req, res) {
    res.send('Modify Post');
});


/*
 * DELETE /posts/:id
 * Deletes a post.
 */
app.del('/posts/:id', function (req, res) {
    res.send('Delete Post');
});


/*
 * GET /users
 * Returns a list of all users.
 */
app.get('/users', function (req, res) {
    var q = db.query('SELECT person_id, name, visited_at FROM people ORDER BY visited_at DESC');
    q.on('row', function (row, result) {
        result.addRow(row);
    });
    q.on('end', function (result) {
        res.send(JSON.stringify(result.rows));
    });
});


/*
 * PUT /users/:id
 * Modifies a user.
 */
app.put('/users/:id', function (req, res) {
    res.send('Modify user');
});


/*
 * GET /login
 * Shows the login page. Redirects to / if user is already authorized.
 */
app.get('/login', function (req, res) {
    res.send('Get Login');
});


/*
 * POST /login
 * Autorizes a user if allowed. Redirects to /login if not.
 */
app.post('/login', function (req, res) {
    res.send('Post Login');
});


/*
 * GET /logout
 * Deletes the user session and redirects to /login
 */
app.get('/logout', function (req, res) {
    res.send('Logout');
});


/*
 * Start the engines
 */
app.listen(process.env.PORT || 1982);
