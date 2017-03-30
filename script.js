var mineN = 13;
var mode = 10;
// Cell Class
var Cell = function (id, mine, row, col, maxrowcol) {
    this.id = id;
    this.mine = mine;
    this.border = 0;
    this.quantumstate = false;
    this.table = {
        row,
        col,
    };
    this.near = {
        up: this.id - 10,
        upright: this.id - 9,

        right: this.id + 1,
        downright: this.id + 11,

        down: this.id + 10,
        downleft: this.id + 9,

        left: this.id - 1,
        upleft: this.id - 11
    };

    //bordercheck
    if ((row == 1 || row == maxrowcol) || (col == 1 || col == maxrowcol)) {
        this.border = 1;

        if (row == 1) {
            this.near.up = false;
            this.near.upleft = false;
            this.near.upright = false;
        }

        if (row == maxrowcol) {
            this.near.down = false;
            this.near.downleft = false;
            this.near.downright = false;
        }

        if (col == 1) {
            this.near.upleft = false;
            this.near.left = false;
            this.near.downleft = false;
        }

        if (col == maxrowcol) {
            this.near.upright = false;
            this.near.right = false;
            this.near.downright = false;
        }

    }
}

// create grid
var gridCellId = 0;

var Cells = [];

for (var i = 0; i < mode; i++) {
    $('#minefield').append("<div class='row'>" + "</div>");
    for (var i2 = 0; i2 < mode; i2++) {
        $('.row').last().append(
            `
                    <div class=col>
                        <span mine=false class=gridCell cell-id=${gridCellId}></span>
                    </div>
                `
        );
        Cells[gridCellId] = new Cell(gridCellId, false, i + 1, i2 + 1, mode);
        gridCellId++;
    }
}

//placemines
for (var i3 = 0; i3 < mineN; i3++) {
    var cellN = Math.floor((Math.random() * (mode * mode)));
    Cells[cellN].mine = true;
    //green for mines
    //$('[cell-id=' + cellN + ']').css('background', 'green');
    $('[cell-id=' + cellN + ']').attr("mine", true);
}

//click event
$(".gridCell").click(function () {
    var cellid = parseInt($(this).attr('cell-id'));
    var mine = $(this).attr('mine');

    // functions?
    function chkCell(id) {
        if (id != false) {
            return Cells[id].mine;
        } else {
            return false
        }
    }

    function chkNear(cell) {
        if (cell != false || typeof cell !== "undefined") {

            var countNearMines = 0;
            try {
                if (chkCell(cell.near.up)) {
                    countNearMines++;
                }
                if (chkCell(cell.near.upright)) {
                    countNearMines++;
                }

                if (chkCell(cell.near.right)) {
                    countNearMines++;
                }
                if (chkCell(cell.near.downright)) {
                    countNearMines++;
                }

                if (chkCell(cell.near.down)) {
                    countNearMines++;
                }
                if (chkCell(cell.near.downleft)) {
                    countNearMines++;
                }

                if (chkCell(cell.near.left)) {
                    countNearMines++;
                }
                if (chkCell(cell.near.upleft)) {
                    countNearMines++;
                }

                if (countNearMines > 0 && !cell.quantumstate) {
                    $('[cell-id=' + cell.id + ']').html(countNearMines);
                    $('[cell-id=' + cell.id + ']').css('background', '#e67e22');
                }

                if (countNearMines == 0 && !cell.quantumstate) {
                    $('[cell-id=' + cell.id + ']').css('background', '#e67e22');

                    cell.quantumstate = true;
                    spread(cell);
                }
            } catch (err) {}
        }
    }

    function spread(cell) {
        if (cell != false || typeof cell !== "undefined") {
            chkNear(Cells[cell.near.up]);
            chkNear(Cells[cell.near.upright]);

            chkNear(Cells[cell.near.right]);
            chkNear(Cells[cell.near.downright]);

            chkNear(Cells[cell.near.down]);
            chkNear(Cells[cell.near.downleft]);

            chkNear(Cells[cell.near.left]);
            chkNear(Cells[cell.near.upleft]);
        }
    }

    //end
    if (Cells[cellid].mine) {
        alert('rip');
        location.reload();
        $('[cell-id=' + cellid + ']').css('background', '#2ecc71');
    } else {
        chkNear(Cells[cellid]);
    }
});