'use strict';

const path = require('path');

module.exports = ( param ) => {
    const { fs, del, folder, messager, args, gulp, shell } = param;

    const dist = path.resolve( folder, './dist' );
    const example = path.resolve( folder, './example' );

    fs.copySync( dist, example, { overwrite: true } );

    del([ dist ], { force: true }, () => {
        gulp.src( `${ example }/js/*.min.js `)
            .pipe( gulp.dest( dist ) )
            .on( 'end', ( ) => {
                messager.success();
            })
    });
}
