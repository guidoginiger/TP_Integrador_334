//cONVIERTE UNA URL DE ARCHIVO A UNA RUTA DE UN SISTEMA DE ARCHIVOS
import {fileURLToPath} from 'url';
//Devuelve el directgorio padre de una ruta
//Ejemplo: dirname('/foo/bar/baz/asdf/quux') -> '/foo/bar
import {dirname} from 'path';
//Une partes de rutas en una sola ruta
//Ejemplo: join('/foo', 'bar', 'baz/asdf', 'quux', 'corge') -> '/foo/bar/baz/asdf/quux/corge'
import {join} from 'path';

const __filename = fileURLToPath(import.meta.url);
//Import .meta.url : Proporciona la url del modulo actual (file:///ruta/algo.js)
//FileUrlToPatch: Convierte esa url en una ruta (C:\ruta\algo.js)

const __dirname = join(dirname(__filename), '../../../');
//dirname: Devuelve el directorio padre de la ruta del archivo actual
//join: Une el directorio padre con la ruta relativa '../../../' para obtener la ruta absoluta
//utils->api>src->tp-progra3

export{
    __filename,
    __dirname,
    join
}