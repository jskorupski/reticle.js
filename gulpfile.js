var gulp = require('gulp');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');

gulp.task('default', function() {


    var minifiedSource = gulp.src('src/reticle.js').pipe(uglify({compress:true, mangle: false}));

    return gulp.src('template/index.html')
            .pipe(
                inject(minifiedSource, {
                    starttag: "<!-- inject:bookmarklet -->",
                    transform: function (filePath, file) {
                        // return minified contents wrapped by anchor tag
                        return "<a href='javascript:" + file.contents.toString('utf8') + "'>Reticle.js</a>"
                    }
                })
            )
            .pipe(gulp.dest('./dist'));
});






