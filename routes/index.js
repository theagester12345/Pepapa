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
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Mobile Phones" OR cat_desc.s_name = "Tablets" OR cat_desc.s_name = "Accessories" GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
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
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Cars" OR  cat_desc.s_name = "Cars Accessories" OR  cat_desc.s_name = "Motorcycles" OR cat_desc.s_name = "Trucks - Commercial Vehicles" OR cat_desc.s_name="Other Vehicles"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
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
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Cameras - Camera Accessories" OR  cat_desc.s_name = "Computers - Laptops" OR  cat_desc.s_name = "TV - Audio - Video" OR cat_desc.s_name = "Video Games - Consoles"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
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
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Houses - Apartments for Sale" OR  cat_desc.s_name = "Houses - Apartments for Rent" OR  cat_desc.s_name = "Temporary & Vacation Rentals" OR cat_desc.s_name = "Land" OR cat_desc.s_name= "Office - Commercial Space"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
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
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Feeds, Supplements & Seeds" OR  cat_desc.s_name = "Livestock, Poultry & Fish" OR  cat_desc.s_name = "Plant & Animal Produce" OR cat_desc.s_name = "Meals & Drinks" OR cat_desc.s_name="Farm Machinery & Equipment" OR cat_desc.s_name="Agricultural services" GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
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
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Furniture" OR  cat_desc.s_name = "Home Appliances" OR  cat_desc.s_name = "Decor - Garden - Accessories" OR cat_desc.s_name = "Office & Commercial"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
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
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Offered Jobs" OR  cat_desc.s_name = "Seeking Work - CVs" OR  cat_desc.s_name = "Services" OR cat_desc.s_name = "Classes & Courses"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
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
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Clothing and Shoes" OR  cat_desc.s_name = "Health and Beauty" OR  cat_desc.s_name = "Watches - Jewelry - Accessories" OR cat_desc.s_name = "Babies and Kids"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
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
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Art - Collectibles" OR  cat_desc.s_name = "Musical Instruments" OR  cat_desc.s_name = "Sporting Goods - Bicycles" OR cat_desc.s_name = "Books - CDs - DVDs" OR cat_desc.s_name="Crafts" OR cat_desc.s_name="Toys and Games"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
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
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Dogs - Cats" OR  cat_desc.s_name = "Other Animals" OR  cat_desc.s_name = "Pet\'s Accessories"  GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
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
				conn.query ('SELECT DATE_FORMAT(item.dt_pub_date,"%e %b %y") AS date_of_pub,item.pk_i_id as ID,CONCAT(currency.s_description,FORMAT((item.i_price)/1000000,0)) as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category,GROUP_CONCAT( "http://pepapa.com/",resource.s_path,resource.pk_i_id,"_thumbnail",".",resource.s_extension) as pic_path FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code WHERE cat_desc.s_name = "Construction Tools & Equipment" OR  cat_desc.s_name = "Construction & Building Materials" OR  cat_desc.s_name = "Business & Industrial Equipment" OR cat_desc.s_name="Construction services" GROUP BY ID ORDER BY ID DESC',function(err,rows,fields){
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

