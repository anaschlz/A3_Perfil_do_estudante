//modal foto perfil
function toggleModal() {
    var modal = document.getElementById('modal');
    modal.classList.toggle('active');
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function changeProfilePicture(element) {
    var profilePicture = document.getElementById('profile-picture');
    profilePicture.src = element.src;
    toggleModal();
}

// modal editar perfil
var editandoPerfil = false;

// Função para abrir o modal
function abrirModal() {
    // Definir a variável de controle como verdadeira quando o botão for clicado
    editandoPerfil = true;
    document.getElementById("modal_editar_perfil").style.display = "block";
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById("modal_editar_perfil").style.display = "none";
    // Resetar a variável de controle quando o modal for fechado
    editandoPerfil = false;
}

// Função para validar o email
function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Função para validar o CPF
function validarCPF(cpf) {
    var re = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/;
    return re.test(cpf);
}

// Função para salvar o perfil editado
function salvarPerfilEditado() {
    var novoEmail = document.getElementById("edit_email").value;
    var novoCPF = document.getElementById("edit_cpf").value;
    var novoEndereco = document.getElementById("edit_endereco").value;

    if (novoEmail === "") {
        novoEmail = document.getElementById("email").textContent;
    }
    if (novoCPF === "") {
        novoCPF = document.getElementById("cpf").textContent.split(" ")[1];
    }
    if (novoEndereco === "") {
        novoEndereco = document.getElementById("endereco").textContent;
    }

    if (novoEmail !== "" && !validarEmail(novoEmail)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    if (novoCPF !== "" && !validarCPF(novoCPF)) {
        alert("Por favor, insira um CPF válido na máscara XXX.XXX.XXX-XX.");
        return;
    }

    document.getElementById("email").textContent = novoEmail;
    document.getElementById("cpf").textContent = "CPF: " + novoCPF;
    document.getElementById("endereco").textContent = novoEndereco;

    fecharModal();
}

// função para mover as UCs
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card-uc');

    let draggedCard = null;

    cards.forEach(card => {
        card.draggable = true;
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragover', dragOver);
        card.addEventListener('drop', drop);
        card.addEventListener('dragend', dragEnd);
    });

    function dragStart() {
        draggedCard = this;
        this.classList.add('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
        this.classList.add('drag-over');
        e.dataTransfer.dropEffect = 'move';
    }

    function drop(e) {
        e.preventDefault();
        if (draggedCard !== this) {
            const draggedIndex = getIndex(draggedCard);
            const dropIndex = getIndex(this);
            const parent = this.parentNode;

            if (draggedIndex < dropIndex) {
                parent.insertBefore(draggedCard, this.nextSibling);
            } else {
                parent.insertBefore(draggedCard, this);
            }
        }

        this.classList.remove('drag-over');
        draggedCard.classList.remove('dragging');
        updateEventListeners();
    }

    function dragEnd() {
        this.classList.remove('dragging');
    }

    function getIndex(card) {
        let index = 0;
        let currentCard = card;
        while ((currentCard = currentCard.previousElementSibling) !== null) {
            index++;
        }
        return index;
    }

    function updateEventListeners() {
        const cards = document.querySelectorAll('.card-uc');

        cards.forEach(card => {
            if (!card.draggable) {
                card.addEventListener('dragstart', dragStart);
                card.addEventListener('dragover', dragOver);
                card.addEventListener('drop', drop);
                card.addEventListener('dragend', dragEnd);
                card.draggable = true;
            }
        });
    }
});

// função para adicionar uma nova UC 
function adicionarUC() {

    var nomeUC = prompt("Digite o nome da nova UC:");
    var codCurso = prompt("Digite o código do curso:");
    var porcentagem = prompt("Digite a porcentagem concluída:");

    if (nomeUC === null || nomeUC.trim() === "") {
        alert("Nome da UC inválido. Por favor, digite um nome válido.");
        return;
    }

    if (codCurso === null || codCurso.trim() === "") {
        alert("Código do curso inválido. Por favor, digite um código válido.");
        return;
    }

    porcentagem = parseFloat(porcentagem);

    if (isNaN(porcentagem)) {
        alert("Porcentagem inválida. Por favor, digite um número.");
        return;
    }

    if (porcentagem < 0 || porcentagem > 100) {
        alert("Porcentagem inválida. Por favor, digite um valor entre 0 e 100.");
        return;
    }

    var novaUC = document.createElement('div');
    novaUC.classList.add('card-uc');
    novaUC.innerHTML = `
    <div class="detalhes_uc">
        <div class="nome_uc">${nomeUC}</div>
        <div class="cod_curso">${codCurso}</div>
        <div class="progress-uc">
            <div class="porcentagem">${porcentagem}%</div>
            <div class="progress-bar-uc">
                <div class="progress-bar-inner" style="width: ${porcentagem}%;"></div>
            </div>
        </div>
    </div>
`;

    var listaUCs = document.querySelector('.uc');
    listaUCs.appendChild(novaUC);

    novaUC.addEventListener('dragstart', dragStart);
    novaUC.addEventListener('dragover', dragOver);
    novaUC.addEventListener('drop', drop);
    novaUC.addEventListener('dragend', dragEnd);

    updateEventListeners();
}

function salvarPerfil(textareaId) {
    const textarea = document.getElementById(textareaId);
    const novoTexto = textarea.value;
    console.log("Novo texto salvo:", novoTexto);
    alert("Novo texto salvo!");
}