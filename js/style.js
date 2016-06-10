 $(function(){ 
  $(document).ready(function() {
	email();
	letras();
	mask();
	enviar();
	senha();
	vldigito();
	validarCPF();
	notificacaoCheck();
	verificaCheck();
  });
 });
 
function email() {
		//atribuindo o valor do campo
		var sEmail	= $("#email").val();
		//filtro
		var emailFilter=/^.+@.+\..{2,}$/;
		//	
		if(!(emailFilter.test(sEmail))||sEmail.match(illegalChars)){
			$("p").show().removeClass("ok").addClass("erro")
			.text('Por favor, informe um email válido.');
		}else{
			$("p").show().addClass("ok")
			.text('Email informado está correto!');
		}
	$('#email').focus(function(){
		$("p.erro").hide();
	});
}

function validarCPF(){
	//evento blur do campo cpf
	$("#cpf").on("blur", function (){
		var cpf = $("#cpf").val();
		var filtro = /^\d{3}.\d{3}.\d{3}-\d{2}$/i;
		if(!filtro.test(cpf)){
			window.alert("CPF inv\u00e1lido.");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;
		}
		cpf = remove(cpf, ".");
		cpf = remove(cpf, "-");	
		if(cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" 
							|| cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999"){
			window.alert("CPF inv\u00e1lido.");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;
		}
		//verifica o primeiro digito
		soma = 0;
		for(i = 0; i < 9; i++)
			soma += parseInt(cpf.charAt(i)) * (10 - i);
		resto = 11 - (soma % 11);
		if(resto == 10 || resto == 11)
			resto = 0;
		if(resto != parseInt(cpf.charAt(9))){
			window.alert("CPF inv\u00e1lido.");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;
		}
		//verifica com o primeiro digito e o segundo
		soma = 0;
		for(i = 0; i < 10; i ++)
			soma += parseInt(cpf.charAt(i)) * (11 - i);
		resto = 11 - (soma % 11);
		if(resto == 10 || resto == 11)
			resto = 0;
		if(resto != parseInt(cpf.charAt(10))){
			window.alert("CPF inv\u00e1lido.");
			$("#cpf").focus();
			$("#cpf").val("");
			return false;
		}
		return true;
	});
	//remove os pontos e traço do numero de cpf antes de verificar
	function remove(str, sub) {
		i = str.indexOf(sub);
		r = "";
		if (i == -1) return str;
		r += str.substring(0,i) + remove(str.substring(i + sub.length), sub);
		return r;
	}
}

function vldigito(){
	$("#senha").on("blur",function() {
	//pegar banco no campo senha
	var senha =  $("#senha").val();
		//verificar se o campo senha tem menos de 6 digito
		if (senha.length <6) {
		alert('Digite no minimo 6 caracteres');
		//foca no campo senha se estiver invalido
		$('#senha').focus();

		return false;

		}
		});
}

function letras() {
	$("#nome").keyup(function() {
		//recebe banco e aplica replace
		var banco = $("#nome").val().replace(/[^a-zA-Z ]+/g,'');
		//envia banco para campo
		$("#nome").val(banco);
	});
}
	
function senha() {
	$("#senha").keyup(function() {
		//recebe banco e aplica replace
		var banco = $("#senha").val().replace(/[^a-zA-Z0-9]+/g,'');
		//envia banco para campo
		$("#senha").val(banco);
	});
}

function mask(){
	$('#telefone').mask('(00)00000-0000');
		$('#cep').mask('00000-000');	
		$('#cpf').mask('000.000.000-00')
	}

function notificacaoCheck(){
	//verifica o click no checkbox
	$("#sim").on("change",function () {  
		verificaCheck();
	});
}

function verificaCheck(){
	if($("#sim").is(":checked")){
		$("#notificacao").show();
	}else
		$("#notificacao").hide();
}

function enviar() {
    var operacao = "X";
    var posicao = -1;
    var resultado = localStorage.getItem("banco");
    resultado = JSON.parse(resultado);
	
    if (resultado == null)
        resultado = [];
	
		$("#cadastro").on("submit", function () {
			
			if (operacao == "X")
				adicionarElemento();
			else
				editarElemento();
    });
	
    $("#resultado").on("click", "#btnEditar", function(){
		$("#enviar").attr('value', "Alterar");
		operacao = "Y";
        posicao = parseInt($(this).attr("alt"));
        
        var cli = JSON.parse(resultado[posicao]);
			$("#cpf").val(cli.cpf);
			$("#nome").val(cli.nome);
			$("#ec").val(cli.ec);
			$("#sel").val(cli.sel);
			$("#telefone").val(cli.telefone);
			$("#cep").val(cli.cep);
			$("#endereco").val(cli.endereco);
			$("#bairro").val(cli.bairro);
			$("#estado").val(cli.estado);
			$("#cidade").val(cli.cidade);
			$("#email").val(cli.email);
			$("#senha").val(cli.senha);
			$("#obs").val(cli.obs);
			$('#sim').attr('checked', cli.sim);
			$("#nome").focus();
		verificaCheck();
    });
	
    $("#resultado").on("click", "#btnExcluir", function(){
        posicao = parseInt($(this).attr("alt"));
        excluir();
        listar();
    });
	
	
	function adicionarElemento() {
		var cliente = JSON.stringify({
			cpf: $("#cpf").val(), 
			nome: $("#nome").val(), 
			ec: $("#ec").val(),
			sel: $("#sel").val(),
			telefone: $("#telefone").val(),
			cep: $("#cep").val(),
			endereco: $("#endereco").val(),
			bairro: $("#bairro").val(),
			estado: $("#estado").val(),
			cidade: $("#cidade").val(),
			email: $("#email").val(),
			senha: $("#senha").val(),
			obs: $("#obs").val(),
			sim: $("#sim").is(":checked")
		});
		resultado.push(cliente);
		localStorage.setItem("banco", JSON.stringify(resultado));
		alert("Cadastro adicionado com sucesso");
		return true;
	}
	
	function editarElemento(){
		resultado[posicao] = JSON.stringify({
			cpf: $("#cpf").val(), 
			nome: $("#nome").val(), 
			ec: $("#ec").val(),
			sel: $("#sel").val(),
			telefone: $("#telefone").val(),
			cep: $("#cep").val(),
			endereco: $("#endereco").val(),
			bairro: $("#bairro").val(),
			estado: $("#estado").val(),
			cidade: $("#cidade").val(),
			email: $("#email").val(),
			senha: $("#senha").val(),
			obs: $("#obs").val(),
			sim: $("#sim").is(":checked")
		});
		localStorage.setItem("banco", JSON.stringify(resultado));
		alert("Cadastro alterado com sucesso");
		operacao = "Y";
		return true;
	}
	
	
	function excluir(){
		resultado.splice(posicao, 1);
		localStorage.setItem("banco", JSON.stringify(resultado));
		alert("Cadastro foi exluido com Sucesso");
		return true;
	}
	
	function listar() {
        $("#resultados").html("");
		for (var i in resultado) {
			var cli = JSON.parse(resultado[i]);
			$('#resultado').find('tbody').append('<tr>' +
			'<td><b>' + cli.cpf + '</b></td>' +
			'<td><b>' + cli.nome + '</b></td>' +
			'<td><input type = "button" id = "btnEditar" class = "btn btn-warning" alt = " '+i+' " value = "Editar"/></td>' +
			'<td><input type = "button" id = "btnExcluir" class = "btn btn-danger" alt = " '+i+' " value = "Remover"/></td>' +
			'</tr>');
			limpar();
		}
	}
	
	$("#cancelar").click(function(){
		operacao = "X";
		$("#enviar").attr('value', "Enviar");
		limpar();
	});
    listar();
	$("#enviar").attr('value', "Enviar");
}
function limpar(){
	$('#cpf').val('');
	$('#nome').val('');
	$('#ec').val('');
	$('#sel').val('');
	$('#telefone').val('');
	$('#cep').val('');
	$('#endereco').val('');
	$('#bairro').val('');
	$('#estado').val('');
	$('#cidade').val('');
	$('#email').val('');
	$('#senha').val('');
	$('#obs').val('');
	$("#sim").is(":checked");
	verificaCheck();
}

		