<html>
<head>    
	<title>今彩539</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf8">
</head>
<body>
<?php
include('simple_html_dom.php');

$url = 'https://www.taiwanlottery.com.tw/Lotto/Dailycash/history.aspx';
$use_include_path = false;


$postdata = array(
	'__VIEWSTATE'=> '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',
	'__VIEWSTATEGENERATOR' => '09BD3138',
	'__EVENTVALIDATION' => 'Pb/dUTecG8OaWe1TJLM9tiVpPpi4glDcUtRUV8xI3zVB9X1lTfwrrbE0ybkZAhkYEESS1Z5Qx8R335x0vcuN4VJEhahRrmVzaDCeJAgPgFcp43kNmCmHT/cXAl0JctItKL88Lfvy/KV4DuHLYYRyEaYvmiLrF0clF3byM0jdWyszlBIn2yHt+vsawJZFERq4JSgUTB4Fe0nM8Iz9YoWd69qLEV68+lafT3eNg4mqB785oXrSm6lMAMfp1WQRkj8pq/87kRVSuz0SkBn7orJb9HuTE6781NelFY9YBFa6ckjvfh9PyhT2gCOeshtb7m2YMZa2BDL0j9IA7iczkcQeQ/7kIGoYB5XTUA9OA4aVh9LuiCXvSCx0jPsOlGOX4qpF7jNvC1z0S+25GhqcpNRXRVltmlxhUQq09ti1Ngb0d3+lcV75T0ZoYXG4zsTE4JZWaL6FpZwUkw1nDYRwmOb1G1xXZwSGg90TE7ibsCeLk66U8knpNbEztolUpDYoToOn/ZxKgybPMhmh8ovJvOYgaV7mwvweaXCS9nFn1SdcZUfJ1RDZOSHqgiUjQUMbEQDeR4ndZhWvEu3/op9xilYP0H/gMSvjL70ApUm2DLl4IjbAx5JW6zDcg+46FlgmU16m3UIVF+9lT0/aYJatKXcQG05XcZw=',
	'forma' => '請選擇遊戲',
	'D539Control_history1$chk'=>'radYM',
	'D539Control_history1$dropYear'=>'111',
	'D539Control_history1$dropMonth'=>'4',
	'D539Control_history1$btnSubmit' => '查詢');

$options = array(
	'http' => array(
		'method' => 'POST',
		'header' => 'Content-type:application/x-www-form-urlencoded',
		'content' => http_build_query($postdata)
));

$context = stream_context_create($options);

$html = file_get_html($url, $use_include_path, $context);

$tableArray = $html -> find('table[id=D539Control_history1_dlQuery] table');

$data =  array();
$idx = 0;
foreach ($tableArray as $table) {
	$ddate = explode("/",$table -> find('span[id=D539Control_history1_dlQuery_D539_DDate_'.$idx.']', 0) -> innertext());
	
	$data[$ddate[0]+1911 . '-' . $ddate[1] . '-' . $ddate[2]] = array(			
		// 大小順序
		'no1' => $table -> find('span[id=D539Control_history1_dlQuery_No1_'.$idx.']', 0) -> innertext(),
		'no2' => $table -> find('span[id=D539Control_history1_dlQuery_No2_'.$idx.']', 0) -> innertext(),
		'no3' => $table -> find('span[id=D539Control_history1_dlQuery_No3_'.$idx.']', 0) -> innertext(),
		'no4' => $table -> find('span[id=D539Control_history1_dlQuery_No4_'.$idx.']', 0) -> innertext(),
		'no5' => $table -> find('span[id=D539Control_history1_dlQuery_No5_'.$idx.']', 0) -> innertext()
	);
		
	$idx++;
}

foreach($data as $key => $value) {
	echo $key . '<br />';
}

?>

</body>
</html>
