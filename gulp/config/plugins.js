// поиск и замена
import replace from "gulp-replace";
// обработка ошибок
import plumber from "gulp-plumber";
// собщения подсказки
import notify from "gulp-notify";
// локальний сервер
import browsersync from "browser-sync";
// проверка обновления
import newer from "gulp-newer";
// Условное ветлвелние
import ifPlugin from "gulp-if"


// експортируем обэкт
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
}