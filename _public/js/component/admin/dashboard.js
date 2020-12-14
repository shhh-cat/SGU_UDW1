 var colors = {
                red: 'rgb(255, 99, 132)',
                orange: 'rgb(255, 159, 64)',
                yellow: 'rgb(255, 205, 86)',
                green: 'rgb(75, 192, 192)',
                blue: 'rgb(54, 162, 235)',
                purple: 'rgb(153, 102, 255)',
                grey: 'rgb(201, 203, 207)'
            };
            var ctx1 = document.getElementById('chart1');
            var ctx2 = document.getElementById('chart2');
            var ctx3 = document.getElementById('chart3');
            var ctx4 = document.getElementById('chart4');
            var color = Chart.helpers.color;
            var chart1 = new Chart(ctx1.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [{
                        label: '2020 Sales',
                        data: [300, 700, 450, 750, 1200],
                        borderColor: color(colors.orange).alpha(0.5).rgbString(),
                        fill: false,
                        },
                        {
                        label: '2019 Sales',
                        data: [200, 450, 900, 600, 1000],
                        borderColor: color(colors.green).alpha(0.5).rgbString(),
                        fill: false,
                        },
                        {
                        label: '2018 Sales',
                        data: [400, 900, 1000, 500, 700],
                        borderColor: color(colors.blue).alpha(0.5).rgbString(),
                        fill: false,
                        }],
                },
                options: {
                    responsive: true,
                    legend: {
                    position: 'bottom',
                    },
                    title: {
                    display: true,
                    text: 'Sales Chart'
                    }
                }
            });

            var chart2 = new Chart(ctx2.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: [
                        'Coffee',
                        'Machine',
                        'Barista',
                        'Brewing',
                        'Roasting',
                    ],
                    datasets: [{
                        data: [24, 11, 5,5,5],
                        backgroundColor: [
                            color(colors.red).alpha(0.5).rgbString(),
                            color(colors.green).alpha(0.5).rgbString(),
                            color(colors.yellow).alpha(0.5).rgbString(),
                            color(colors.orange).alpha(0.5).rgbString(),
                            color(colors.blue).alpha(0.5).rgbString(),
                        ],
                        hoverBorderWidth: 8,
                        hoverBorderColor: '#ffffff',
                    }],
                },
                options: {
                    responsive: true,
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'Product chart'
                    }
                }
            });

            var chart3 = new Chart(ctx3.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['2017', '2018', '2019', '2020'],
                    datasets: [{
                        label: '< 20 age customer',
                        data: [300, 700, 450, 750],
                        backgroundColor: color(colors.red).alpha(0.5).rgbString(),
                        fill: false,
                        },
                        {
                        label: '20 - 60 age customer',
                        data: [200, 450, 600, 900],
                        backgroundColor: color(colors.blue).alpha(0.5).rgbString(),
                        fill: false,
                        },
                        {
                        label: '> 60 age customer',
                        data: [400, 500, 900, 1000],
                        backgroundColor: color(colors.green).alpha(0.5).rgbString(),
                        fill: false,
                        }],
                },
                options: {
                    responsive: true,
                    legend: {
                    position: 'bottom',
                    },
                    title: {
                    display: true,
                    text: 'Customer Chart'
                    }
                }
            });
            var chart4 = new Chart(ctx4.getContext('2d'), {
                type: 'polarArea',
                data: {
                    labels: ['Ho Chi Minh', 'Ha Noi', 'Da nang', 'Hai Phong', 'Orther'],
                    datasets: [{
                        label: '< 20 age customer',
                        data: [500,400,200,200,50],
                        backgroundColor: [
                            color(colors.red).alpha(0.5).rgbString(),
                            color(colors.orange).alpha(0.5).rgbString(),
                            color(colors.yellow).alpha(0.5).rgbString(),
                            color(colors.green).alpha(0.5).rgbString(),
                            color(colors.blue).alpha(0.5).rgbString(),
                        ],
                    }],
                },
                options: {
                    responsive: true,
                    legend: {
                    position: 'right',
                    },
                    title: {
                    display: true,
                    text: 'Customer Chart'
                    }
                }
            });
            $( "#chart2" ).mouseover(
            function(){
                if (chart2.options.circumference === Math.PI) {
                    chart2.options.circumference = 2 * Math.PI;
                    chart2.options.rotation = -Math.PI / 2;
                } else {
                    chart2.options.circumference = Math.PI;
                    chart2.options.rotation = -Math.PI;
                }

                chart2.update();
            }).mouseout(
            function(){
                if (chart2.options.circumference === Math.PI) {
                    chart2.options.circumference = 2 * Math.PI;
                    chart2.options.rotation = -Math.PI / 2;
                } else {
                    chart2.options.circumference = Math.PI;
                    chart2.options.rotation = -Math.PI;
                }

                chart2.update();
            });
            