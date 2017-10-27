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
				conn.query ('SELECT item.dt_pub_date AS date_of_pub,item.i_price as price, item.s_contact_name as name, item.s_contact_email as email,item_d.s_title as item_title,item_d.s_description as item_desc, location.s_region as region,location.s_city as city, telephone.s_telephone as telephone, cat_desc.s_name as category, currency.s_description as currency,resource.pk_i_id as pic_name,resource.s_path as pic_path,resource.s_extension as pic_type FROM oc_t_item as item JOIN oc_t_item_description as item_d ON item.pk_i_id = item_d.fk_i_item_id JOIN oc_t_item_location as location ON item.pk_i_id = location.fk_i_item_id JOIN oc_t_item_telephone as telephone ON item.pk_i_id = telephone.fk_i_item_id JOIN oc_t_item_resource as resource ON item.pk_i_id = resource.fk_i_item_id JOIN oc_t_category_description as cat_desc ON item.fk_i_category_id = cat_desc.fk_i_category_id JOIN oc_t_currency as currency ON item.fk_c_currency_code = currency.pk_c_code ORDER BY date_of_pub DESC',function(err,rows,fields){
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