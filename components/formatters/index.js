import {checkForHeaders, freeagentDateFormat, negateAmount, tidyWhitespace} from '../utilities'
import dayjs from 'dayjs'
import starling from "./starling";
import marcus from "./marcus";
import newday from "./newday";
import coventrybuildingsociety from "./coventrybuildingsociety";


/*
 * ****************************************************
 * IMPORTANT: Add new formatters above this comment
 * then add a new item to the 'formatters' object below
 * ****************************************************
 */

const formatters = [
    coventrybuildingsociety,
    marcus,
    newday,
    starling
];

export default formatters;
