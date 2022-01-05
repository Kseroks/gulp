import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
	// Ищет файли шрифтов .otf
	return app.gulp.src(`${app.path.srcFolder}/fonst/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			}))
		)
		// Концетрируем в .ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		// Вигружаем в исходную папку
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}


export const ttfToWoff = () => {
	// Ищет файли шрифтов .ttf
	return app.gulp.src(`${app.path.srcFolder}/fonst/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <% error.message %>"
			}))
		)
		// Концетрируем в woff
		.pipe(fonter({
			formats: ['woff']
		}))
		// Вигружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// Ищем файли шрифтов .ttf
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		// Конвентируем в .woff2
		.pipe(ttf2woff2())
		// Вигружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
}


export const fontsStyle = () => {
	// Файл стилей подключения шрифтов
	let fonstFile = `${app.path.srcFolder}/scss/fonst.scss`;
	// Проверяем существуют ли файли шрифтов
	fs.readdir(app.path.build.fonts, function (err, fonstFile) {
		if (fonstFile) {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fonstFile)) {
				// Если файла нет создаем его
				fs.writeFile(fonstFile, "", cb);
				let newFileOnly;
				for (var i = 0; i < fonstFile.length; i++) {
					// Записиваем подключения шрифтов в файл стилей
					let fontFileName = fonstFile[i].split(".")[0];
					if (newFileOnly !== fontFileName) {
						let fonstName = fontFileName.split("-")[0] ? fontFileName.split("-")[0] : fontFileName;
						let fontWeigth = fontFileName.split("-")[1] ? fontFileName.split("-")[1] : fontFileName;
						if (fontWeigth.toLowerCase() === "thin") {
							fontWeigth = 100;
						} else if (fontWeigth.toLowerCase() === "extraligth") {
							fontWeigth = 200;
						} else if (fontWeigth.toLowerCase() === "ligth") {
							fontWeigth = 300;
						} else if (fontWeigth.toLowerCase() === "medium") {
							fontWeigth = 500;
						} else if (fontWeigth.toLowerCase() === "semibold") {
							fontWeigth = 600;
						} else if (fontWeigth.toLowerCase() === "bold") {
							fontWeigth = 700;
						} else if (fontWeigth.toLowerCase() === "extrabold" || fontWeigth.toLowerCase() === "heavy") {
							fontWeigth = 800;
						} else if (fontWeigth.toLowerCase() === "black") {
							fontWeigth = 900;
						} else {
							fontWeigth = 400;
						}
						fs.appendFile(fonstFile, `@font-face {\n\tfont-family: ${fonstName};\n\tfont-dispaly: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff");\n\tfont-weigth: ${fontWeigth};\n\tfont-style: normal;\n}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// если файл есть, виводим собщения
				console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!")
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() { }
}