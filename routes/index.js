var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// Getting all the items in the database
router.get('/getallitems',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc, location.s_region as region,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});


// Getting phone - tablets category from databse
router.get('/getptcat',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_slug = "mobile-phones" OR cat_desc.s_name = "Tablets" OR cat_desc.s_name = "Accessories" GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});

// Getting vehicles category from database
router.get('/getvehcat',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Cars" OR  cat_desc.s_slug = "cars-accessories" OR  cat_desc.s_name = "Motorcycles" OR cat_desc.s_slug = "trucks-commercial-vehicles" OR cat_desc.s_slug="other-vehicles"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});


// Getting Electronic category from database
router.get('/getelectcat',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_slug = "cameras-camera-accessories" OR  cat_desc.s_slug = "computers-laptops" OR  cat_desc.s_slug = "tv-audio-video" OR cat_desc.s_slug = "video-games-consoles"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});


// Getting Real estate category from database
router.get('/getrecat',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_slug = "houses-apartments-for-sale" OR  cat_desc.s_slug= "houses-apartments-for-rent" OR  cat_desc.s_slug = "temporary-vacation-rentals" OR cat_desc.s_name = "Land" OR cat_desc.s_slug= "office-commercial-space"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});

// Getting Agric and food category from database
router.get('/getagriccat',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_slug = "feeds-supplements-seeds" OR  cat_desc.s_slug= "livestock-poultry-fish" OR  cat_desc.s_slug= "plant-animal-produce" OR cat_desc.s_slug= "meals-drinks" OR cat_desc.s_slug="farm-machinery-equipment" OR cat_desc.s_slug="agricultural-services" GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});

// Getting home and furniture category from db
router.get('/gethfcat',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Furniture" OR  cat_desc.s_slug= "home-appliances" OR  cat_desc.s_slug= "decor-garden-accessories" OR cat_desc.s_slug= "office-commercial"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});

// Getting jobs and service category from db
router.get('/getjscat',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_slug= "offered-jobs" OR  cat_desc.s_slug = "seeking-work-cvs" OR  cat_desc.s_name = "Services" OR cat_desc.s_slug= "classes-courses"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});

// Getting fashion and beauty category from db
router.get('/getfbcat',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_slug= "clothing-and-shoes" OR  cat_desc.s_slug= "health-and-beauty" OR  cat_desc.s_slug= "watches-jewelry-accessories" OR cat_desc.s_slug= "babies-and-kids"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});


// Getting hobbies art sport category from db
router.get('/gethascat',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_slug = "art-collectibles" OR  cat_desc.s_slug = "musical-instruments" OR  cat_desc.s_slug = "sporting-goods-bicycles" OR cat_desc.s_slug= "books-cds-dvds" OR cat_desc.s_name="Crafts" OR cat_desc.s_slug="toys-and-games"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});


// Getting animals(lol) category from db 
router.get('/getanicat',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_slug= "dogs-cats" OR  cat_desc.s_slug = "other-animals" OR  cat_desc.s_slug = "pet-s-accessories"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});


// Getting industrial and construction category from db
router.get('/geticcat',function(req,res,next){
	try{
		req.getConnection(function(err,conn){
			if (err){
				console.error('SQL connection error:'+ err);
				return next (err);
			}else {
				console.log('SQL connection successful');
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_slug= "construction-tools-equipment" OR  cat_desc.s_slug= "construction-building-materials" OR  cat_desc.s_slug= "business-industrial-equipment" OR cat_desc.s_slug="construction-services" GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
					if (err){
						console.error('Sql query error:'+ err);
						return next (err);
					}
					var obj_array = [];
					for (var index in rows){
						var object_hold =rows[index];
						obj_array.push(object_hold); 
					}
					res.json(obj_array);
				});
			}
		});

	}catch (ex){
		console.error('Internal error:'+ ex);
		return next (ex);
	}
});

