//gulpfile.js主配置文件，用于定义任务
// 此处代码是由Node执行


"use strict";//必须位于首行
//加载模块
var gulp=require("gulp");
var less=require("gulp-less");
var cssmin=require("gulp-cssmin");
var concat=require("gulp-concat");
var uglify=require("gulp-uglify");
var imagemin=require("gulp-imagemin");
var clean=require("gulp-clean");
var browserSync = require('browser-sync').create();
//定义一个简单的任务
gulp.task("hello",function(){
	console.log("hello world");
});

//定义复制文件的功能
gulp.task("html",function(){
	gulp.src("src/**/*.html")//读取文件
	.pipe(gulp.dest("dist/"));//通过管道再次操作，写入到文件夹dist中去

});
// 编译less成css,并对css文件进行压缩
gulp.task("less",function(){
	gulp.src("src/less/*.less")
	.pipe(less())//编译
	.pipe(cssmin())
	.pipe(gulp.dest("dist/css/"));
});

//定义一个合并压缩混淆js的任务
gulp.task("js",function(){
	gulp.src("src/js/*.js")//合并js文件
	.pipe(concat("all.js"))
	.pipe(uglify())
	.pipe(gulp.dest("dist/js/"));
});
//定义图片压缩的任务
gulp.task("image",function(){
	gulp.src("src/images/*")
	.pipe(imagemin())//压缩图片,对于png有效
	.pipe(gulp.dest("dist/images/"));
});
//定义清空内容的任务
gulp.task("clean",function(){
	gulp.src("dist/")
	.pipe(clean());//清空
	
});

//合并任务
// 如果任务名是default，那么执行任务的时候可以直接gulp
gulp.task("dist",["html","less","js","image"]);

//定义一个监视任务，监视文件的变化
gulp.task("watch",function(){
	//监视src目录下所有的html文件，当发生改变的时候，会自动执行html任务
	gulp.watch("src/**/*.html",["html"]);
	gulp.watch("src/less/*.less",["less"]);
	gulp.watch("src/js/*.js",["js"]);
	gulp.watch("src/images/*",["image"]);
});
//定义一个浏览器同步
gulp.task("default",["html","less","js","image","watch"],function(){
	browserSync.init({
		server:{
			baseDir:"./dist"
		},
		port:2018
	});
});



