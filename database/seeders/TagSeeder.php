<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = [
            'javascript' => 'For questions regarding programming in ECMAScript (JavaScript/JS) 
                             and its various dialects/implementations (excluding ActionScript). 
                             Please include all relevant tags on your question; e.g., [node.js], 
                             [jquery], [json], [reactjs], [angular], [vue.js], [typescript], 
                             [svelte] etc.',
            'typescript' => 'TypeScript is a typed superset of JavaScript that transpiles to plain 
                             JavaScript. It adds optional types, classes, interfaces, and modules to 
                             JavaScript. This tag is for questions specific to TypeScript. It is not 
                             used for general JavaScript questions.',
            'node' =>       'Node is a JavaScript runtime based on the V8 JavaScript engine and executes 
                             JavaScript code outside the web browser. Node is used for a number of 
                             commandline and build tools as well as for building high-performance 
                             web applications.',
            'express' =>    'Express is a minimal and flexible Node.js web application framework providing 
                             a robust set of features for building web applications.',
            'ejs' =>        '"E" is for "embedded." EJS is a simple templating language that lets you generate 
                             HTML markup with plain JavaScript. No religiousness about how to organize things. 
                             No reinvention of iteration and control-flow. It\'s just plain JavaScript.',
            'nestjs' =>     'Nest (NestJS) is a framework for building efficient, scalable Node.js server-side 
                             applications. It uses progressive JavaScript, is built with and fully supports 
                             TypeScript.',
            'sequelize' =>  'The Sequelize library provides an ORM (Object-Relational-Mapper) for Node.js, 
                             written entirely in JavaScript. Provides easy mapping for MySQL, MariaDB, SQLite, 
                             PostgreSQL and SQL Server.',
            'typeorm' =>    'TypeORM is an object-relational mapper for TypeScript and JavaScript that supports 
                             many different databases like MySQL and PostgreSQL and platforms like Node.js and 
                             the Browser.',
            'postgresql' =>  'PostgreSQL is an open-source, relational database management system (RDBMS) available 
                              for all major platforms including Linux, UNIX, Windows and OS X. Mention your version 
                              of Postgres when asking questions. Consider dba.stackexchange.com for questions 
                              concerning administration or advanced features.',
            'mysql' =>       'MySQL is a free, open source Relational Database Management System (RDBMS) that uses 
                              Structured Query Language (SQL). DO NOT USE this tag for other DBs such as SQL Server, 
                              SQLite etc. Those are different DBs which all use their own dialects of SQL to manage 
                              the data.',
            'php' =>         'PHP is a widely used, open source, general-purpose, multi-paradigm, 
                              dynamically typed and interpreted scripting language originally 
                              designed for server-side web development. Use this tag for questions 
                              about programming in the PHP language.',
            'laravel' =>     'The Laravel framework is an open-sourced PHP web framework that allows 
                              developers to create dynamic and scalable web applications. The source 
                              code of Laravel is hosted on GitHub and released under the MIT license.',
            'blade' =>       'Blade is the simple, yet powerful templating engine provided with Laravel. 
                              Unlike other popular PHP templating engines, Blade does not restrict you from 
                              using plain PHP code in your views.',
            'eloquent' =>    'The Eloquent ORM included with Laravel provides a beautiful, simple ActiveRecord 
                              implementation for working with your database. Each database table has a corresponding 
                              "Model" which is used to interact with that table. Models allow you to query for data 
                              in your tables, as well as insert new records into the table.',
            'linux' =>       'NOTICE: All Linux questions must be related to programming; those that aren\'t will be 
                              closed. Use this tag only if your question relates to programming using Linux APIs or 
                              Linux-specific behavior, not just because you happen to run your code on Linux. If you 
                              need Linux support you can try https://unix.stackexchange.com or the specific Linux 
                              distribution\'s Stack Exchange site like https://askubuntu.com or 
                              https://elementaryos.stackexchange.com/',
            'inertiajs' =>   'Inertia.js lets you quickly build modern single-page React, Vue and Svelte apps using 
                              classic server-side routing and controllers.',
            'react'     =>    'React is a JavaScript library for building user interfaces. It uses a declarative, 
                              component-based paradigm and aims to be both efficient and flexible.',
            'vue' =>          'Vue.js is an open-source, progressive JavaScript framework for building user interfaces 
                              that aims to be incrementally adoptable. Vue.js is mainly used for front-end development 
                              and requires an intermediate level of HTML and CSS.',
            'angular' =>     'Questions about Angular (not to be confused with AngularJS), the web framework from Google. 
                              Use this tag for Angular questions which are not specific to an individual version. For the 
                              older AngularJS (1.x) web framework, use the AngularJS tag.',
            'pug' =>         'Pug (formerly known as Jade) is a robust, elegant and feature-rich template engine for Node.js.',
            'html' =>        'HTML (HyperText Markup Language) is the markup language for creating web pages and other information 
                              to be displayed in a web browser. Questions regarding HTML should include a minimal reproducible 
                              example and some idea of what you\'re trying to achieve. This tag is rarely used alone and is often 
                              paired with [CSS] and [javascript].',
            'css' =>         'CSS (Cascading Style Sheets) is a representation style sheet language used for describing the look 
                              and formatting of HTML (HyperText Markup Language), XML (Extensible Markup Language) documents and 
                              SVG elements including (but not limited to) colors, layout, fonts, and animations. It also describes 
                              how elements should be rendered on screen, on paper, in speech, or on other media.',
            'less' =>        'Less is an open-source stylesheet preprocessor that extends CSS with dynamic behavior such as variables, 
                              mixins, operations and functions. For the UNIX command, use [less-unix].',
            'sass' =>        'Sass (Syntactically Awesome Style Sheets) is an extension of CSS adding features like nested rules, 
                              variables, mixins and class extensions. This enables developers to write structured, manageable and 
                              reusable CSS. Sass is compiled into standard CSS. It is primarily a CSS pre-processor language that 
                              accepts both the CSS and its personalised syntax of writing visual design codes.',
            'java' =>        'Java is a high-level object oriented programming language. Use this tag when you\'re having problems 
                              using or understanding the language itself. This tag is frequently used alongside other tags for libraries 
                              and/or frameworks used by Java developers.',
            'spring' =>      'The Spring Framework is an open source framework for application development on the Java platform. At its 
                              core is rich support for component-based architectures, and it currently has over twenty highly integrated 
                              modules.',
            'spring-boot' => 'Spring Boot is a framework that allows to easily create Spring-powered, production-grade applications and 
                              services with the absolute minimum fuss. It takes an opinionated view of the Spring platform designed to 
                              work for new and experienced users of Spring.',
            'maven' =>       'Apache Maven is a build automation and project management tool used primarily for Java projects. This tag 
                              is for questions that don\'t relate to a specific Maven version. Use the gradle tag instead for questions 
                              relating to Gradle.',
        ];

        foreach ($tags as $tag => $guidance)
        {
            DB::table('tags')->insert([
                'name' => $tag,
                'guidance' => $guidance,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
