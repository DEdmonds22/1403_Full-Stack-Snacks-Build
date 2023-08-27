/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config(); /*loads ENV variables; should always be done first and at the top */
const express = require('express'); /* imports express module */
const morgan = require('morgan');   /* imports morgan module */
const methodOverride = require('method-override');  /* imports the method-override module */
const mongoose = require('mongoose');   /* imports mongoose module */
const path = require('path');   /* built-in node module we use to resolve paths */