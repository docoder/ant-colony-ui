/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import cssInitials from 'css-initials';

const toCSS = obj => Object.keys(obj).map(key => `${key}: ${obj[key]};`).join('\n');

export default `
  ${toCSS(cssInitials)}
  
`;