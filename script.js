const url = 'https://script.google.com/macros/s/AKfycbxSsc_yjBUP7Cvz0dsLo4Kqcm-lvVePZHuPVHVXyp4t8N4vRQ25MJR3umhEdrtL-TBh/exec';

window.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('loading').style.display = 'flex'; // ロードマーク表示
    await get();
    document.getElementById('loading').style.display = 'none'; // ロードマーク非表示
});

async function get() {
    let retry_count = 1;

    while (retry_count <= 3) {
        try {
            const res = await fetch(url);

            if (res.ok) {
                const json_data = await res.json();
                console.debug(json_data);

                // tbody作成
                const tbody = document.getElementById('tbody');

                json_data.forEach(row => {
                    const tr = document.createElement('tr');

                    row.forEach((col, i) => {
                        console.debug(col);
                        const td = document.createElement('td');
                        td.textContent = col;

                        switch (i) {
                            case 0:
                                if (col == '') {
                                    td.textContent = col;
                                } else {
                                    td.textContent = `${col}月`;
                                }

                                break;

                            case 1:
                                if (col == '') {
                                    td.textContent = col;
                                } else {
                                    td.textContent = `${col}日`;
                                }

                                break;

                            case 3:
                                td.textContent = col.replace(/~/g, '\n~');
                                break;

                            default:
                                td.textContent = col;
                                break;
                        }

                        tr.appendChild(td);
                    });

                    tbody.appendChild(tr);
                });

                return;
            }
        } catch (error) {
            alert(`読み込みエラーが発生しました。\n再試行します。\n（${retry_count}/3）`);
            retry_count++;
        }
    }

    alert('スケジュールが読み込めませんでした。\nネットワーク接続をもう一度確認の上、再試行してください。');
    window.location.reload();
}

document.getElementById('reload').addEventListener('click', () => window.location.reload());
