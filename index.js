const bdata = require('./basedata.json');

cg("dadad adsasdads 1").then(response => {
    console.log(response);
})

function cg(messagestring) {
    return new Promise(resolve => {

        asyncfunction();
        async function asyncfunction() { //make the function async

            let { values, options } = await getmessage(messagestring);
            if (values === null) {
                return resolve("```No values specified```");
            }

            if ((typeof values != "object") || ((options !== undefined) && (typeof values != "object"))) return resolve("Values and options must be arrays");

            let { bar, barwhole, blank, bwidth, height, label, numerical } = await getparams(options); //parameters

            let finalarray, testarray, testarray2, bararray, labelarray;
            let barlong = false;
            let gtg = false;
            let sendingmessage = "```\n";
            let spacewidth = -1;
            let barwidth = 0;
            let number = 0;
            let line = 0;

            values = values.map(Number); //convert to numbers

            if (barwhole == true) {
                barwidth = bar.length;
            }
            for (var i = 0; i < values.length; i++) {
                values[i] = parseInt(values[i], 10);
                if (i == (values.length - 1)) {
                    testarray2 = values.slice(0);
                    testarray = (testarray2.sort(function (a, b) { return b - a; }));
                    if (testarray[0] > 999999) {
                        return resolve("```Use numbers 999,999 or less```");
                    }
                    if ((barwhole == true) && (testarray[0].toString().length > bar.length)) {
                        return resolve("```If you use whole words as bars, they must be as long or longer then the length of the biggest number.```");
                    }
                    if (label == true) {
                        testlabelarray = labelarray.slice(0);
                        testlabelarray2 = (testlabelarray.sort(function (a, b) { return b.length - a.length; }));
                        if ((testlabelarray2[0].length > barwidth) && (barwhole == false)) {
                            barwidth = testlabelarray2[0].length;
                        }
                    }
                    if (bar.length > 1) {
                        bararray = (bar.split(''));
                        barlong = true;
                    }
                    if (barwidth == 0) {
                        barwidth = testarray[0].toString().length;
                    }
                    if ((testarray[0].toString().length > barwidth)) {
                        barwidth = testarray[0].toString().length;
                    }
                    if (blank == true) {
                        if (bwidth == false) {
                            barwidth = 1;
                        }
                        label = false;
                        if (spacewidth == -1) {
                            spacewidth = 0;
                        }
                    }
                    if (numerical == 0) {
                        var origarray = values.slice();
                        finalarray = values.sort(function (a, b) { return b - a; });
                        if (label == true) {
                            let origlblarray = labelarray.slice();
                            i = 0;
                            var nm = 0;
                            var tbar = (new Array(barwidth).join("_"));
                            do {
                                nm = origarray.indexOf(finalarray[i]);
                                if (nm < labelarray.length) {
                                    labelarray[i] = origlblarray[nm];
                                } else {
                                    labelarray[i] = tbar;
                                }
                                i++;
                            } while (i < finalarray.length);
                        }
                    } else if (numerical == 1) {
                        finalarray = values.sort(function (a, b) { return a - b; });
                        if (label == true) {
                            let origlblarray = labelarray.slice(0);
                            i = 0;
                            var nm = 0;
                            var tbar = (new Array(barwidth).join("_"));
                            do {
                                nm = origarray.indexOf(finalarray[i]);
                                if (nm < labelarray.length) {
                                    labelarray[i] = origlblarray[nm];
                                } else {
                                    labelarray[i] = tbar;
                                }
                                i++;
                            } while (i < finalarray.length);
                        }
                    } else {
                        finalarray = values;
                        if ((label == true) && (labelarray.length < finalarray.length)) {
                            i = labelarray.length
                            var tbar = (new Array(barwidth).join("_"));
                            do {
                                labelarray.push(tbar);
                                i++;
                            } while (labelarray.length < finalarray.length);
                        }
                    }
                    if ((label == true) && (labelarray.length > finalarray.length)) {
                        return resolve("```Too many lables for the number of inputs```");
                    }
                    if (spacewidth < 0) {
                        spacewidth = 2;
                    }
                    finalarray2 = finalarray.slice();
                    if (height == 0) {
                        height = 1;
                        number = 1;
                    } else {
                        number = Math.round((Math.max.apply(Math, finalarray2)) / height);
                    }
                    i = 0;
                    if ((((finalarray.length - 1) * spacewidth) + (barwidth * finalarray.length)) > 100) {
                        let len = ((finalarray.length - 1) * spacewidth) + (barwidth * finalarray.length);
                        return resolve("```Graph will be too wide, try using less inputs, reducing space between bars, or reducing bar width if possibe (" + len + "/100)```");
                    }
                    var counter = 2000;
                    do {
                        if ((counter < 1800) && (i == (finalarray2.length - 1))) {
                            gtg = true;
                        }
                        finalarray2[i] = (Math.round(finalarray[i] / number));
                        line = Math.max.apply(Math, finalarray2);
                        if ((i == (finalarray.length - 1)) && (gtg == false)) {
                            number++;
                            i = -1;
                        }
                        i++;
                        if (gtg == true) {
                            var x = ((Math.max.apply(Math, finalarray2)) * finalarray.length);
                            var i = 0;
                            var j = 0;
                            var num;
                            var lines = finalarray.length;
                            var ind = 0;
                            line = Math.max.apply(Math, finalarray2);
                            do {
                                num = finalarray2[j];
                                if (num >= line) {
                                    if (barlong == true) {
                                        if (barwhole == false) {
                                            var w = 0;
                                            do {
                                                bar = bararray[ind];
                                                sendingmessage += bar
                                                ind++;
                                                w++;
                                                if (ind == bararray.length) {
                                                    ind = 0;
                                                }
                                            } while (w < barwidth);
                                        } else {
                                            sendingmessage += bar;
                                        }
                                    } else {
                                        sendingmessage += (new Array(barwidth + 1).join(bar));
                                    }
                                } else {
                                    if (line == 1) {
                                        sendingmessage += (new Array(barwidth + 1).join(bdata.line));
                                    } else {
                                        sendingmessage += (new Array(barwidth + 1).join(bdata.space));
                                    }
                                }
                                if (spacewidth > 0) {
                                    sendingmessage += (new Array(spacewidth + 1).join(bdata.space));
                                }
                                if ((line == 1) && (j == (lines - 1))) {
                                    sendingmessage += "\n\n";
                                    i = 0;
                                    do {
                                        if (blank == false) {
                                            num = finalarray[i];
                                            sendingmessage += (num + (new Array(barwidth - (num.toString().length - 1)).join(bdata.space)));
                                            if (spacewidth > 0) {
                                                sendingmessage += (new Array(spacewidth + 1).join(bdata.space));
                                            }
                                        }
                                        i++;
                                        if (i == lines) {
                                            if (label == false) {
                                                return resolve(sendingmessage + "\nScale = 1:" + number + "```");
                                                return
                                            } else {
                                                var i2 = 0;
                                                sendingmessage += "\n\n";
                                                do {
                                                    num = labelarray[i2];
                                                    sendingmessage += (num + (new Array(barwidth - (num.length - 1)).join(bdata.space)));
                                                    if (spacewidth > 0) {
                                                        if (num.length > barwidth) {
                                                            var t = (num.length - barwidth - 1);
                                                            sendingmessage += (new Array(spacewidth + t).join(bdata.space));
                                                        } else {
                                                            sendingmessage += (new Array(spacewidth + 1).join(bdata.space));
                                                        }

                                                    }
                                                    i2++;
                                                    if ((i2 == lines)) {
                                                        return resolve(sendingmessage + "\nScale = 1:" + number + "```");
                                                    }
                                                } while ((i2 < lines));
                                            }
                                        }
                                    } while (i < lines);
                                }
                                if (j == (lines - 1)) {
                                    sendingmessage += "\n"
                                    line--;
                                    j = 0;
                                } else {
                                    j++;
                                }
                                i++;
                            } while (i < x);
                        }
                        var xx = (Math.max.apply(Math, finalarray2));
                        var yy = finalarray2.length;
                        counter = ((xx + 1) * (barwidth * yy)) + (xx * ((yy - 1) * spacewidth) + xx);
                        if (label == true) {
                            counter += xx;
                        }
                        if (isNaN(counter)) {
                            return resolve("```Inputs are not numbers```");
                        }
                    } while (gtg == false);
                }
            }
        }
    });
}

function getparams(options) { //get any optional parameter changes
    return new Promise(resolve => {
        let bar = bdata.bar, barwhole = false, blank = false, bwidth = false, height = 0, label = false, numerical = 0;
        if (options === undefined) {
            return resolve({
                bar: bar,
                barwhole: barwhole,
                blank: blank,
                bwidth: bwidth,
                height: height,
                label: label,
                numerical: numerical
            });
        }
        for (let i = 0; i < options.length; i++) { //check each word to see if it's a command
            let command = options[i].toLowerCase();
            let casecmd = options[i];
            if (command == "blank") {
                blank = true;
            } else if (command.startsWith("h")) {
                height = parseInt((command.slice(1)), 10);
            } else if (command.startsWith("b")) {
                bwidth = true;
                barwidth = parseInt((command.slice(1)), 10);
            } else if (command.startsWith("s")) {
                spacewidth = parseInt((command.slice(1)), 10);
            } else if (command.startsWith("c")) {
                bar = (casecmd.slice(1));
            } else if (command.startsWith("w")) {
                bar = (casecmd.slice(1));
                barwhole = true;
            } else if (command.startsWith("l")) {
                labelarray = (casecmd.slice(1)).split(',');
                label = true;
            } else if (command.startsWith("n")) {
                numerical = (parseInt((command.slice(1)), 10))
            }

            if (i == (options.length - 1)) {
                return resolve({
                    bar: bar,
                    barwhole: barwhole,
                    blank: blank,
                    bwidth: bwidth,
                    height: height,
                    label: label,
                    numerical: numerical
                });
            }
        }
    });
}

function getmessage(message) {
    return new Promise(resolve => {
        let args = message.split(" ");
        let length = 0;

        for (let i = 0; i < args.length; i++) {
            if (!isNaN(args[i])) { //if it is a number
                let options;
                if (i > 0) { //if there are options
                    options = message.substring(0, length).split(" ");
                }
                return resolve({
                    values: message.substring(length, message.length).split(" "),
                    options: options
                })
            }
            length += (args[i].length + 1); //add length plus space length

            if (i == (args.length - 1)) { //if there are no values
                return resolve({
                    values: null,
                    options: null
                });
            }
        }
    });
}