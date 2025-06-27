// タブ切り替え
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(targetId).classList.add('active');
  });
});

// ユーザー一覧読み込み（fetch）
const userList = document.getElementById('userList');

const loadUsers = async () => {
  try {
    const response = await fetch('./user.json');
    const users = await response.json();

    userList.innerHTML = '';
    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${user.name}</strong> (${user.age}歳, ${user.gender})<br>
        <small>${user.email}</small>
      `;
      userList.appendChild(li);
    });
  } catch (error) {
    userList.innerHTML = '<li>ユーザー情報の取得に失敗しました。</li>';
    console.error(error);
  }
};

loadUsers();

// ユーザー追加フォーム
const form = document.getElementById('userForm');
form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);
  const newUser = {
    name: formData.get('name'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    email: formData.get('email')
  };

  // 簡易バリデーション（必須チェックはHTML側required属性で済ませるとして）
  if (!newUser.name || !newUser.age || !newUser.gender || !newUser.email) {
    alert('全ての項目を入力してください。');
    return;
  }

  // リストに即時追加（今回はダミー処理でサーバー保存はなし）
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${newUser.name}</strong> (${newUser.age}歳, ${newUser.gender})<br>
    <small>${newUser.email}</small>
  `;
  userList.appendChild(li);

  alert('ユーザーを追加しました！');

  form.reset();
  // 一覧タブに自動で切り替え
  tabs.forEach(t => t.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));
  document.querySelector('[data-tab="list"]').classList.add('active');
  document.getElementById('list').classList.add('active');
});
