            const delay = 300;
            var round = 1;
            var i = 0;
            let gameMatriz = Array(3);

            gameMatriz["a"] = Array(3);
            gameMatriz["b"] = Array(3);
            gameMatriz["c"] = Array(3);

            gameMatriz["a"][1] = "";
            gameMatriz["a"][2] = "";
            gameMatriz["a"][3] = "";

            gameMatriz["b"][1] = "";
            gameMatriz["b"][2] = "";
            gameMatriz["b"][3] = "";

            gameMatriz["c"][1] = "";
            gameMatriz["c"][2] = "";
            gameMatriz["c"][3] = "";

            /* SHOW ALERT FUNCTION*/
            const alertPlaceholder = $("body");
            const appendAlert = (message, type) => {
                i++;
                $(".alert-box").removeClass("alert-box-show");
                setTimeout(() => {
                    $(".alert-box").remove();
                    const wrapper = document.createElement('div');
                    wrapper.innerHTML = [
                        `<div class="alert alert-${type} alert-dismissible alert-box" role="alert">`,
                        `   <div class="alert-message">${message}</div>`,
                        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                        '</div>'
                    ].join('')
                    alertPlaceholder.append(wrapper);
                    setTimeout(() => {
                        $(".alert-box").addClass("alert-box-show");
                    }, delay);
                }, delay);
            }

            $(document).ready(function () {
                $("#btn-start-game").click(function () {
                    const nickname1 = $("#input-1").val();
                    const nickname2 = $("#input-2").val();
                    console.log(nickname1);
                    console.log(nickname2);
                    if ((nickname1 != "" && nickname1 != null) && (nickname2 != "" && nickname2 != null)) {
                        $("#nickname-1").html(nickname1);
                        $("#nickname-2").html(nickname2);


                        $(".alert-box").removeClass("alert-box-show");
                        $(".alert-box").remove();
                        $("#initial-page").addClass("initial-page-hide");
                        setTimeout(() => {
                            $("#initial-page").hide();
                            $("#game-stage").show();
                            setTimeout(() => {
                                $("#game-stage").addClass("game-stage-show");

                            }, delay);
                        }, delay);
                    } else {
                        /* SHOW ALERT */
                        appendAlert('Fill All The Name Fields!', 'danger');
                    }
                })

                $(`.tic-tac-toe-grid`).click(function () {
                    var clickedFieldId = this.id;
                    $("#" + clickedFieldId).off();
                    play(clickedFieldId);
                });


                function play(clickedGrid) {
                    var icon = '';
                    var score = 0;

                    if ((round % 2) == 1) {
                        icon = "url(../img/marcacao_1.png)";
                        score = -1;
                    } else {
                        icon = "url(../img/marcacao_2.png)";
                        score = 1;
                    }

                    $("#" + clickedGrid).css("background-image", icon);
                    round++;

                    var columnLine = clickedGrid.split("-");

                    gameMatriz[columnLine[0]][columnLine[1]] = score;

                    checkCombination();

                }

                function checkCombination() {
                    var points = 0;
                    for (let i = 1; i <= 3; i++) {
                        points = points + gameMatriz['a'][i];
                    }
                    winner(points);

                    points = 0;
                    for (let i = 1; i <= 3; i++) {
                        points = points + gameMatriz['b'][i];
                    }
                    winner(points);
                    points = 0;
                    for (let i = 1; i <= 3; i++) {
                        points = points + gameMatriz['c'][i];
                    }
                    winner(points);


                    points = 0;
                    points = points + gameMatriz['a'][1];
                    points = points + gameMatriz['b'][1];
                    points = points + gameMatriz['c'][1];

                    winner(points);

                    points = 0;
                    points = points + gameMatriz['a'][2];
                    points = points + gameMatriz['b'][2];
                    points = points + gameMatriz['c'][2];

                    winner(points);

                    points = 0;
                    points = points + gameMatriz['a'][3];
                    points = points + gameMatriz['b'][3];
                    points = points + gameMatriz['c'][3];

                    winner(points);

                    points = 0;
                    points = points + gameMatriz['a'][1];
                    points = points + gameMatriz['b'][2];
                    points = points + gameMatriz['c'][3];

                    winner(points);

                    points = 0;
                    points = points + gameMatriz['a'][3];
                    points = points + gameMatriz['b'][2];
                    points = points + gameMatriz['c'][1];

                    winner(points);

                };

                function winner(points) {
                    var nickname1 = $("#input-1").val();
                    var nickname2 = $("#input-2").val();
                    if (points == -3) {
                        appendAlert(`${nickname1} Win!`, 'success');
                        $(`.tic-tac-toe-grid`).off();
                    } else if (points == 3) {
                        appendAlert(`${nickname2} Win!`, 'success');
                        $(`.tic-tac-toe-grid`).off();
                    }
                }
            })