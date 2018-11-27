SET NAMES UTF8;
DROP DATABASE IF EXISTS novel;
CREATE DATABASE novel CHARSET=UTF8;
USE novel;


/**用户信息**/
CREATE TABLE nov_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  subtitle VARCHAR(128),
  email VARCHAR(64),
  avatar VARCHAR(128),
  gender INT
);

/**评论表**/
CREATE TABLE nov_comment(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  date DATETIME,
  comment VARCHAR(1024)
);

/*书籍信息*/

CREATE TABLE nov_book(
  bid INT PRIMARY KEY AUTO_INCREMENT,
  bookname VARCHAR(32),
  author VARCHAR(32),
  poster VARCHAR(128),
  smimg VARCHAR(128),
  subtitle VARCHAR(1024),
  date DATETIME
);


/*用户信息插入*/
INSERT INTO nov_user VALUES
(NULL,'dingding','123456','feel like sunshine','dingding@163.com','../IMG/head1.png',1),
(NULL,'zhangmin','123456','feel like sunshine','zhangmin@163.com','../IMG/head1.png',0),
(NULL,'yanyan','123456','feel like sunshine','yanyan@163.com','../IMG/head1.png',0),
(NULL,'dangdang','123456','feel like sunshine','dangdang@163.com','../IMG/head1.png',1),
(NULL,'dongdong','123456','feel like sunshine','dongdong@163.com','../IMG/head1.png',1),
(NULL,'zhanglin','123456','feel like sunshine','zhanglin@163.com','../IMG/head1.png',0);


/*书籍信息插入*/
INSERT INTO nov_book VALUES
(NULL,'斗破苍穹','天蚕土豆','http://127.0.0.1:3000/img/bgposter/1.jpg','http://127.0.0.1:3000/img/smposter/1.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8'),
(NULL,'梦的解析','外国人','http://127.0.0.1:3000/img/bgposter/2.jpg','http://127.0.0.1:3000/img/smposter/2.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8'),
(NULL,'呐喊','鲁迅','http://127.0.0.1:3000/img/bgposter/3.jpg','http://127.0.0.1:3000/img/smposter/3.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8'),
(NULL,'国富论','外国人','http://127.0.0.1:3000/img/bgposter/4.jpg','http://127.0.0.1:3000/img/smposter/4.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8'),
(NULL,'武动乾坤','天蚕土豆','../icon/poster1.jpg','http://127.0.0.1:3000/img/smposter/5.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8'),
(NULL,'男人来自火星','外国人','../icon/poster1.jpg','http://127.0.0.1:3000/img/smposter/6.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8'),
(NULL,'人生不止有技术','我','../icon/poster1.jpg','http://127.0.0.1:3000/img/smposter/7.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8'),
(NULL,'资本论','外国人','../icon/poster1.jpg','http://127.0.0.1:3000/img/smposter/8.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8'),
(NULL,'大主宰','天蚕土豆','../icon/poster1.jpg','http://127.0.0.1:3000/img/smposter/9.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8'),
(NULL,'女人来自金星','外国人','../icon/poster1.jpg','http://127.0.0.1:3000/img/smposter/10.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8'),
(NULL,'从入门到放弃','我','../icon/poster1.jpg','http://127.0.0.1:3000/img/smposter/11.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8'),
(NULL,'小学语文课本','娃娃','../icon/poster1.jpg','http://127.0.0.1:3000/img/smposter/12.jpg','讲述了一个少年，捡到戒指从此开启了开挂人生的故事','2017-7-8');




/*评论信息插入*/
INSERT INTO nov_comment VALUES
(NULL,'dingding',now(),'你好啊'),
(NULL,'zhangmin',now(),'评论评论评论评论评论评论评论'),
(NULL,'sunqian',now(),'欢迎光临'),
(NULL,'yangyan',now(),'赶紧更新啊'),
(NULL,'dongdong',now(),'你大爷'),
(NULL,'linlin',now(),'评论写的不错啊论'),
(NULL,'linlin',now(),'卧槽真好看');