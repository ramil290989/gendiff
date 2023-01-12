### Hexlet tests and linter status:
[![Actions Status](https://github.com/ramil290989/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/ramil290989/frontend-project-46/actions)
<a href="https://codeclimate.com/github/ramil290989/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/5daeba69d96022eca71f/maintainability" /></a>
<a href="https://codeclimate.com/github/ramil290989/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/5daeba69d96022eca71f/test_coverage" /></a>
<h1>Описание</h1>
<p>Приложение <em>gendiff</em> сравнивает два файла в формате .json или .yaml и выводит на экран их различия. Вывести на экран результат работы приложения можно в трех разных форматах.</p>
<h1>Установка</h1>
<p>Для установки приложения необходимо:</p>
<ol> 
    <li>скопировать репозиторий <a href="https://github.com/ramil290989/frontend-project-46">https://github.com/ramil290989/frontend-project-46</a> на компьютер.</li>
    <li>перейти в терминале в корневую директорию репозитория</li>
    <li>выполнить команду <em>make install</em></li>
</ol>
<p>После выполнения установки можно запускать приложение.</p>
<hr>
<h1>Системные требования</h1>
<p>Операционная система Ubuntu 22.04.1 LTS или выше</p>
<p>Node.js v16.17.1 или выше</p>
<hr>

<h2>Справочная информация</h2>
<p>вывести справочную информацию о приложении можно командой <em>gendiff -h</em></p>
<a href="https://asciinema.org/a/fDXyBAVbufB8Rcdw0slSbMVUG" target="_blank"><img src="https://asciinema.org/a/fDXyBAVbufB8Rcdw0slSbMVUG.svg" /></a>
<hr>

<h2>Сравнение файлов</h2>
<p>Для сравнения двух файлов нужно указать путь к этим файлам <em>gendiff '../file1-hex.json' '../file2-hex.yml'</em></p>
<p>А так же через параметр <em>-f</em> можно указать один из трех форматов вывода результата работы приложения на экран (stylish, plain, json)</p>
<p>Если не указывать формат будет выбран формат по умолчанию <em>stylish</em></p>
<hr>

<h2>Вывод на экран результата в формате stylish</h2>
<a href="https://asciinema.org/a/1hRYKH5SmHjn37JN05pVzRgNT" target="_blank"><img src="https://asciinema.org/a/1hRYKH5SmHjn37JN05pVzRgNT.svg" /></a>
<hr>

<h2>Вывод на экран результата в формате plain</h2>
<a href="https://asciinema.org/a/cEJeBkUK44CjKg5MBOGsuEoly" target="_blank"><img src="https://asciinema.org/a/cEJeBkUK44CjKg5MBOGsuEoly.svg" /></a>
<hr>

<h2>Вывод на экран результата в формате json</h2>
<a href="https://asciinema.org/a/ccBLZy2EeC9L0zDakJCFl04Yb" target="_blank"><img src="https://asciinema.org/a/ccBLZy2EeC9L0zDakJCFl04Yb.svg" /></a>
<hr>

<h2>Ошибка</h2>
<p>При выборе файла не в формате .json .yaml или .yml приложение выдаст ошибку.</p>
<a href="https://asciinema.org/a/x10MaCJYqmsvKHa5HY0WUdCD0" target="_blank"><img src="https://asciinema.org/a/x10MaCJYqmsvKHa5HY0WUdCD0.svg" /></a>
<hr>
