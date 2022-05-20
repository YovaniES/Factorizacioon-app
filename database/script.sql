 CREATE TABLE `usuario` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `permitir_usuario` int(1) NOT NULL DEFAULT '0',
  `usuario` varchar(50) NOT NULL,
  `clave` varchar(32) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `documento` varchar(12) NOT NULL,
  `imagen` varchar(200) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `fecha_nacimiento` int(10) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(7) NOT NULL,
  `celular` varchar(9) NOT NULL,
  `codigo_recuperacion` varchar(20) NOT NULL,
  `fecha_codigo_expiracion` int(10) NOT NULL,
  `conexion` int(10) NOT NULL,
  `desconexion` int(10) NOT NULL,
  `fecha_registro` int(10) NOT NULL,
  `fecha_modificacion` int(10) NOT NULL,
  `eliminacion_logica` int(1) NOT NULL DEFAULT '1',
  `persona_id` int(5) DEFAULT NULL,
  `sexo_id` int(5) NOT NULL,
  `nivel_id` int(5) NOT NULL,
  `usuario_id` int(5) NOT NULL,
  `generico` int(11) DEFAULT '1',
  `codigo_application` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(320, 1, 'jesus.munante', 'fac12e4dc8995c079fd810459bb6a864', '', '', '', 'Jesus', 'Muñante', 0, '', '', '', '', 0, 0, 0, 0, 0, 1, NULL, 1, 102, 0, 1, 'B2B');
INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(321, 1, 'luis.llanos', '9ec392c27a435602a8e96a1533762f54', '', '', '', 'Luis', 'Llanos', 0, '', '', '', '', 0, 0, 0, 0, 0, 1, NULL, 1, 101, 0, 1, 'B2B');
INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(272, 1, 'alex.garcia', 'b36e654c6930efec8b3892324af81cdf', 'amgarciaf@indracompany.com', '48131032', '', 'Alex Martín', 'Garcia Farfan', 733208400, 'JORGE BASADRE 233', '4888888', '979249947', '', 0, 1582325011, 1582325057, 1576177766, 1578004370, 1, 224, 1, 104, 272, 1, 'B2B');
INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(319, 1, 'armando.polar', 'c0f5058a8e2adc13f339083cacb6e96f', '', '', '', 'Armando', 'Polar', 0, '', '', '', '', 0, 0, 0, 0, 0, 1, NULL, 1, 101, 0, 1, 'B2B');
INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(317, 0, 'pilar.hurtado', 'c747c27bda7d948c15e81a4e052cf380', '', '', '', 'Pilar', 'Hurtado', 0, '', '', '', '', 0, 0, 0, 0, 0, 1, NULL, 2, 104, 0, 1, 'B2B');
INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(318, 1, 'jose.pena', 'de8f39a4bc83e1ad23d6f5aa85f18e37', '', '', '', 'Jose', 'Peña Cetraro', 0, '', '', '', '', 0, 0, 0, 0, 0, 1, NULL, 1, 102, 0, 1, 'B2B');
INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(315, 1, 'ruth.polo', '74c54ce531faed5f4746f49e2096c28c', '', '', '', 'Ruth', 'Polo', 0, '', '', '', '', 0, 0, 0, 0, 0, 1, NULL, 2, 103, 0, 0, 'B2B');
INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(316, 1, 'micchelly.munoz', 'd96f6c8b8f7643c07e96c5c53671a1c1', '', '', '', 'Micchelly', 'Muñoz', 0, '', '', '', '', 0, 0, 0, 0, 0, 1, NULL, 2, 104, 0, 1, 'B2B');
INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(313, 1, 'jesus.munante', 'fac12e4dc8995c079fd810459bb6a864', '', '', '', 'Jesus', 'Muñante', 0, '', '', '', '', 0, 0, 0, 0, 0, 1, NULL, 1, 102, 0, 1, 'B2B');
INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(314, 1, 'noe.saldana', '189f0b002899a924e173a39bbf28cc17', '', '', '', ' Noe', 'Saldaña', 0, '', '', '', '', 0, 0, 0, 0, 0, 1, NULL, 1, 102, 0, 1, 'B2B');
INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(312, 1, 'luis.malpartida', 'ed08d3792fa411506f880d60418569c3', '', '', '', 'Luis', 'Malpartida', 0, '', '', '', '', 0, 0, 0, 0, 0, 1, NULL, 1, 102, 0, 0, 'B2B');
INSERT INTO usuario
(id, permitir_usuario, usuario, clave, correo, documento, imagen, nombre, apellido, fecha_nacimiento, direccion, telefono, celular, codigo_recuperacion, fecha_codigo_expiracion, conexion, desconexion, fecha_registro, fecha_modificacion, eliminacion_logica, persona_id, sexo_id, nivel_id, usuario_id, generico, codigo_application)
VALUES(322, 1, 'lisset.bolanos', 'ed08d3792fa411506f880d60418569c3', '', '', '', 'Limna Lisset', 'Bolaños Rodriguez', 0, '', '', '', '', 0, 0, 0, 0, 0, 1, NULL, 2, 102, 0, 0, 'SUPPORT');


CREATE TABLE `facturacion` (
`idFactura` INT(11) NOT NULL AUTO_INCREMENT,
`periodo` DATE NOT NULL ,
`idProyecto` INT(11) NOT NULL DEFAULT '0',
`subServicio` VARCHAR(50) NOT NULL DEFAULT '0' ,
`gestor` VARCHAR(50) NULL DEFAULT '0' ,
`venta_declarada` DECIMAL(20,2) NOT NULL DEFAULT '0.00',
`idEstado` INT(11) NOT NULL,
`orden_compra` VARCHAR(20) NULL DEFAULT '' ,
`cod_certificacion` VARCHAR(20) NULL DEFAULT '' ,
`factura` VARCHAR(20) NULL DEFAULT '' ,
`monto_facturado` DECIMAL(20,2) NULL DEFAULT NULL,
`Comentarios` VARCHAR(5000) NULL DEFAULT NULL ,
`idMotivo` INT(11) NULL DEFAULT NULL,
`idUsuarioCrea` INT(11) NULL DEFAULT NULL,
`fechaCrea` DATETIME NULL DEFAULT NULL,
`idUsuarioActualiza` INT(11) NULL DEFAULT NULL,
`fechaActualiza` DATETIME NULL DEFAULT NULL,
PRIMARY KEY (`idFactura`) USING BTREE
)


CREATE TABLE `facturacion_cambios` (
`idFactCambio` INT(11) NOT NULL AUTO_INCREMENT,
`idFactura` INT(11) NOT NULL DEFAULT '0',
`idEstado` INT(11) NOT NULL DEFAULT '0',
`venta_declarada` DECIMAL(20,2) NOT NULL DEFAULT '0.00',
`idProyecto` INT(11) NOT NULL DEFAULT '0',
`dFecha` DATETIME NOT NULL  ,
`usuario` INT(11) NOT NULL DEFAULT '0',
PRIMARY KEY (`idFactCambio`) USING BTREE
);

drop procedure `prc_update_facturacion`;
-------------------------

CREATE PROCEDURE `prc_update_facturacion`(
	IN p_id_factura int,
    IN p_id_proyecto int,
	IN p_subservicio VARCHAR(50),
	IN p_gestor VARCHAR(50),
	IN p_venta_declarada DECIMAL(20,2),
	IN p_id_estado int,
	IN p_orden_compra  VARCHAR(20),
	IN p_certificacion  VARCHAR(20),
	IN p_factura  VARCHAR(20),
	IN p_monto_facturado DECIMAL(20,2),
	in p_comentariosGenerales VARCHAR(5000),
    IN p_fecha_actualizacion datetime,
    IN p_user_actualizacion int,
    IN  CONFIG_USER_ID int,
    OUT CONFIG_OUT_MSG_ERROR VARCHAR(255),
	OUT CONFIG_OUT_MSG_EXITO VARCHAR(255)
)
BEGIN
	UPDATE facturacion
    set
		idProyecto         = p_id_proyecto,
		subServicio        = p_subservicio,
		gestor             = p_gestor,
		venta_declarada    = p_venta_declarada,
		idEstado           = p_id_estado,
		orden_compra       = p_orden_compra,
		cod_certificacion  = p_certificacion,
		factura            = p_factura,
		monto_facturado    = p_monto_facturado,
		Comentarios        = p_comentariosGenerales,
		fechaActualiza     = p_fecha_actualizacion,
		idUsuarioActualiza = p_user_actualizacion
	WHERE
		idFactura = p_id_factura;
	SET CONFIG_OUT_MSG_EXITO = "Actualización exitosa";
END;


CREATE TRIGGER `my_trigger_historial_facturacion` AFTER UPDATE ON `facturacion` FOR EACH ROW
    BEGIN
        /*Add any fields you want to compare here*/
        IF (old.idEstado <> NEW.idEstado or OLD.venta_declarada <> NEW.venta_declarada or  OLD.idProyecto <> NEW.idProyecto) THEN
            INSERT INTO `facturacion_cambios` (
                `idFactura`,
                `idEstado`,
                `venta_declarada`,
                `idProyecto`,
                `usuario`
            ) VALUES (
                OLD.`idFactura`,
                NEW.`idEstado`,
                NEW.`venta_declarada`,
                NEW.`idProyecto`,
                NEW.`idUsuarioActualiza`
            );
        END IF;
    END;
---------------------------------------

create procedure `prc_ins_registro_factura_certificacion`(
    IN p_idFactura int,
    IN p_fecha_facturacion datetime,
    IN p_importe decimal(20,2),
    IN p_oc varchar(50),
    IN p_certificacion varchar(50),
    IN p_factura varchar(50),
    IN p_fechacreacion datetime,
    IN p_usuario int
)
BEGIN
	INSERT INTO facturacion_certificacion(
      idFactura,
      fecha_facturacion,
      importe,
      oc,
      certificacion,
      factura,
      dFecha,
      usuario
    )
    VALUES
    (
      p_idFactura,
      p_fecha_facturacion,
      p_importe,
      p_oc,
      p_certificacion,
      p_factura,
      p_fechacreacion,
      p_usuario
     );
END;

CREATE  PROCEDURE `prc_update_facturacion_certificacion`(
	IN p_idFactCertificacion int,
    IN p_fecha_facturacion datetime,
    IN p_importe decimal(20,2),
    IN p_oc varchar(50),
    IN p_certificacion varchar(50),
    IN p_factura varchar(50),
    IN p_fecha_actualizacion datetime,
    IN p_usuario int
)
BEGIN
	UPDATE facturacion_certificacion
    set
		fecha_facturacion = p_fecha_facturacion,
		importe           = p_importe,
		oc                = p_oc,
		certificacion     = p_certificacion,
		factura           = p_factura,
		dFecha 		      = p_fecha_actualizacion,
		usuario           = p_usuario

	WHERE
		idFactCertificacion = p_idFactCertificacion;
END;


---------------------------------------------------
ALTER TABLE facturacion_certificacion ADD COLUMN `comentario` text DEFAULT NULL AFTER `dFecha`;
drop PROCEDURE `prc_ins_registro_factura_certificacion`;

CREATE  PROCEDURE `prc_ins_registro_factura_certificacion`(
    IN p_idFactura int,
    IN p_fecha_facturacion datetime,
    IN p_importe decimal(20,2),
    IN p_oc varchar(50),
    IN p_certificacion varchar(50),
    IN p_factura varchar(50),
    IN p_fechacreacion datetime,
    IN p_comentario text,
    IN p_usuario int
)
BEGIN
	INSERT INTO facturacion_certificacion(
      idFactura,
      fecha_facturacion,
      importe,
      oc,
      certificacion,
      factura,
      dFecha,
      comentario,
      usuario
    )
    VALUES
    (
      p_idFactura,
      p_fecha_facturacion,
      p_importe,
      p_oc,
      p_certificacion,
      p_factura,
      p_fechacreacion,
      p_comentario,
      p_usuario
     );
END;

-------------------------------------
drop PROCEDURE `prc_update_facturacion_certificacion`;
CREATE PROCEDURE `prc_update_facturacion_certificacion`(
	IN p_idFactCertificacion int,
    IN p_fecha_facturacion datetime,
    IN p_importe decimal(20,2),
    IN p_oc varchar(50),
    IN p_certificacion varchar(50),
    IN p_factura varchar(50),
    IN p_fecha_actualizacion datetime,
    IN p_comentario text,
    IN p_usuario int
)
BEGIN
	UPDATE facturacion_certificacion
    set
		fecha_facturacion = p_fecha_facturacion,
		importe           = p_importe,
		oc                = p_oc,
		certificacion     = p_certificacion,
		factura           = p_factura,
		dFecha 		      = p_fecha_actualizacion,
		comentario        = p_comentario,
		usuario           = p_usuario
	WHERE
		idFactCertificacion = p_idFactCertificacion;
END;

-----------------------------------------------
INSERT INTO db_support.entidad (id_tabla,id_correlativo,valor_texto_1,estado)
	VALUES (0,8,'Gestores',1);

INSERT INTO db_support.entidad (id_tabla,id_correlativo,valor_texto_1,valor_texto_2,fecha_creacion_bd,idPadre,id_usuario_creacion,estado)
	VALUES (8,1,'Paul Leon','Paul Leon',now(),658,0,1);
INSERT INTO db_support.entidad (id_tabla,id_correlativo,valor_texto_1,valor_texto_2,fecha_creacion_bd,idPadre,id_usuario_creacion,estado)
	VALUES (8,2,'Ricardo Fernandez','Ricardo Fernandez',now(),174,0,1);


INSERT INTO db_support.entidad (id_tabla,id_correlativo,valor_texto_1,estado)
	VALUES (0,9,'Tipo de Liquidación',1);

INSERT INTO db_support.entidad (id_tabla,id_correlativo,valor_texto_1,valor_texto_2,fecha_creacion_bd,id_usuario_creacion,estado)
	VALUES (9,1,'Acta','Acta',now(),0,1);

INSERT INTO db_support.entidad (id_tabla,id_correlativo,valor_texto_1,valor_texto_2,fecha_creacion_bd,id_usuario_creacion,estado)
	VALUES (9,1,'Regularización','Regularización',now(),0,1);

INSERT INTO db_support.entidad (id_tabla,id_correlativo,valor_texto_1,valor_texto_2,fecha_creacion_bd,id_usuario_creacion,estado)
	VALUES (9,1,'Pago Adelantado','Pago Adelantado',now(),0,1);



drop PROCEDURE `prc_update_masivo_proyectos`

CREATE PROCEDURE `prc_update_masivo_proyectos`(
	IN p_idproyecto int,
    IN p_idestado int,
    IN p_periodo date,
    IN p_fecha_actualizacion datetime,
    IN p_usuario int
)
BEGIN
	UPDATE facturacion
    SET
		idEstado          = p_idestado,
		fechaActualiza 	  = p_fecha_actualizacion,
		idUsuarioActualiza= p_usuario
	WHERE
		idProyecto = p_idproyecto and
	    DATE_FORMAT(periodo ,'%Y-%m') = DATE_FORMAT(p_periodo ,'%Y-%m')  ;
END;

ALTER TABLE facturacion ADD COLUMN `idLiquidacion` int(11) DEFAULT NULL AFTER `idProyecto`;

/**/

ALTER TABLE facturacion ADD COLUMN `idGestor` int(11) DEFAULT NULL AFTER `gestor`;

drop  PROCEDURE `prc_creacion_facturacion`;
CREATE PROCEDURE `prc_creacion_facturacion`(
    IN p_periodo date,
    IN p_id_proyecto int,
    IN p_id_liquidacion int,
	IN p_subservicio VARCHAR(50),
	IN p_id_gestor int,
	IN p_venta_declarada DECIMAL(20,2),
	IN p_id_estado int,
	IN p_orden_compra  VARCHAR(20),
	IN p_certificacion  VARCHAR(20),
	IN p_factura  VARCHAR(20),
	IN p_monto_facturado DECIMAL(20,2),
	in p_comentariosGenerales VARCHAR(5000),
    IN p_user_creacion  int,
    IN p_fecha_creacion datetime,
    IN  CONFIG_USER_ID int,
    OUT CONFIG_OUT_MSG_ERROR VARCHAR(255),
	OUT CONFIG_OUT_MSG_EXITO VARCHAR(255)
)
BEGIN
    /*DECLARE v_id_registro int default 0;
    declare v_registro INT default 0;
	select  COUNT(*)  into v_registro from facturacion f  where idFactura =p_codigo_ticket_generado;*/
	INSERT INTO facturacion(
	periodo,
    idProyecto,
    idLiquidacion,
    subServicio,
    idGestor,
    venta_declarada,
    idEstado,
    orden_compra,
    cod_certificacion,
    factura,
    monto_facturado,
    Comentarios,
    idUsuarioCrea,
    fechaCrea

    )
    VALUES
    (
    p_periodo,
	p_id_proyecto,
	p_id_liquidacion,
	p_subservicio,
	p_id_gestor,
	p_venta_declarada,
	p_id_estado,
	p_orden_compra,
	p_certificacion,
	p_factura,
	p_monto_facturado,
	p_comentariosGenerales,
      p_user_creacion,
      p_fecha_creacion
     );
END;




drop PROCEDURE `prc_update_facturacion`;

/*Agregar campo de estado a facturacion detalle dentro de las actas */
ALTER TABLE facturacion_certificacion ADD COLUMN `idEstado` int(11) DEFAULT NULL AFTER `certificacion`;



