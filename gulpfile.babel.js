
import gulp from 'gulp'
import del from 'del'
import babel from 'gulp-babel'


gulp.task('build', async () => {

	await del([ 'build' ])

	await gulp.src([
		'server/src/**/*',
		'!server/src/**/*.js'
	]).pipe(gulp.dest('server/build'))


	await gulp.src([
		'server/src/**/*.js'
	]).pipe(babel({
		presets: [ 'babel-preset-es2015', 'babel-preset-es2016', 'babel-preset-es2017' ].map(require.resolve),
		plugins : [ 'transform-runtime' ]
	})).pipe(gulp.dest('server/build'))

})

gulp.task('watch', () => gulp.watch([ 'server/src/**/*' ], [ 'build' ]))


gulp.task('default', [ 'build', 'watch' ])
