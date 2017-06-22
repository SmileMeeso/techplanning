/**
 * body layout, global variable to support runtime action key selection
 *
 */


/**
 * constructor for shuttle
 */
function Log11stClientSentinelShuttle(userSpecifiedKeys) {

    /**
     * polyfill utils
     *
     * SEN-309
     *   - Object.keys (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
     * SEN-397
     *   - Array.isArray (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
     */

    var util = {};

    util.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };

    util.getObjectKeys = (function() {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function(obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());

    /** constructor start */
    var log = {
        sentinel_meta: {
            _$schemaId: "Log11stClient",
            _$projectId: "",
            _$fieldOrder: {},
            _$encryptionFields: [
                "device_id"
            ]
        }
    };

    var headers = [
        "page_id",
        "action_id",
        "base_time",
        "local_time",
        "recv_time",
        "os_name",
        "os_version",
        "resolution",
        "screen_width",
        "screen_height",
        "language_code",
        "rake_lib",
        "rake_lib_version",
        "ip",
        "recv_host",
        "token",
        "log_version",
        "device_id",
        "device_model",
        "manufacturer",
        "carrier_name",
        "network_type",
        "app_version",
        "app_release",
        "browser_name",
        "browser_version",
        "referrer",
        "url",
        "document_title",
        "pcid",
        "page_version",
        "service_country_code",
        "service_language_code",
        "service_currency_code",
        "member_no",
        "mdn",
        "birthyear",
        "gender_code",
        "pf_clf",
        "poc_clf",
        "bm_clf",
        "partner_cd",
        "advrt_no",
        "advrt_kwd",
        "mobile_document_title",
        "gaid",
        "idfa",
        "dmpc",
        "ab_tcs",
        "atrb_code",
        "reserved01",
        "reserved02",
        "reserved03",
        "reserved04",
        "reserved05",
        "reserved06",
        "reserved07",
        "reserved08",
        "reserved09",
        "reserved10",
        "reserved11",
        "reserved12",
        "reserved13",
        "reserved14",
        "reserved15",
        "reserved16",
        "reserved17",
        "reserved18",
        "reserved19",
        "reserved20",
        "reserved21",
        "reserved22",
        "reserved23",
        "reserved24",
        "reserved25",
        "reserved26",
        "reserved27",
        "reserved28",
        "reserved29",
        "reserved30",
        "reserved31",
        "reserved32",
        "reserved33",
        "reserved34",
        "reserved35",
        "reserved36",
        "reserved37",
        "reserved38",
        "reserved39",
        "reserved40",
        "reserved41",
        "reserved42",
        "reserved43",
        "reserved44",
        "reserved45",
        "reserved46",
        "reserved47",
        "reserved48",
        "reserved49",
        "reserved50",
        "reserved51",
        "reserved52",
        "reserved53",
        "reserved54",
        "reserved55",
        "reserved56",
        "reserved57",
        "reserved58",
        "reserved59",
        "reserved60",
        "reserved61",
        "reserved62",
        "reserved63",
        "reserved64",
        "reserved65",
        "reserved66",
        "reserved67",
        "reserved68",
        "reserved69",
        "reserved70",
        "reserved71",
        "reserved72",
        "reserved73",
        "reserved74",
        "reserved75",
        "reserved76"
    ];

    var bodies = [
        "abroad_delivery_tax_info_type",
        "ad_area_gubn",
        "ad_rank",
        "ad_trc_no",
        "ad_typ_gubn",
        "ad_type",
        "ad_type_cd",
        "ad_yn",
        "address_name",
        "address_search_type",
        "advert_statement",
        "app_name",
        "area_code",
        "area_index",
        "attribute",
        "bank_code",
        "basket_product_list",
        "basket_product_option_sequence",
        "basket_sequence",
        "basket_sequence_list",
        "benefit",
        "brand_code",
        "brand_name",
        "brand_no",
        "btn_name",
        "bundle_check_index",
        "card_company_code",
        "card_pay_type_code",
        "card_pay_type_name",
        "cash_receipt_type_code",
        "catalog_no",
        "category_name",
        "category_no",
        "cell_type",
        "check_value",
        "colloseo_brand_add_display_category_no",
        "colloseo_brand_code",
        "colloseo_click_info",
        "colloseo_id",
        "colloseo_item_no",
        "colloseo_mid",
        "conten_name",
        "content_image_url",
        "content_link_url",
        "content_name",
        "content_no",
        "content_type",
        "country",
        "coupon_issue_no",
        "coupon_no",
        "custom_key",
        "custom_yn",
        "date",
        "date_list",
        "delivery_company",
        "depth",
        "detail_category_name",
        "detail_category_no",
        "discount_amount",
        "disp_space_id",
        "disp_space_no",
        "disp_spce_no",
        "display_category_no",
        "display_order",
        "e_coupon_send_type",
        "end_time",
        "event_no",
        "except_keyword",
        "except_word",
        "filter_category_name",
        "filter_category_no",
        "find_type",
        "from_time",
        "generalproduct_prd_cnt",
        "generalproduct_sub_cnt",
        "hotkeyword",
        "include_keyword",
        "included_ad_type",
        "index",
        "input_value",
        "installment_period_value",
        "is_adult_product",
        "is_life_plus",
        "is_mart",
        "is_now_delivery",
        "is_sale",
        "keyword",
        "large_category_name",
        "large_category_no",
        "last_discount_price",
        "link_url",
        "major_product_module_cnt",
        "mart_basket_sequence",
        "mart_basket_sequence_list",
        "menu_name",
        "meta_category_no",
        "middle_category_name",
        "middle_category_no",
        "movie_name",
        "movie_no",
        "notice_no",
        "number",
        "option_name",
        "option_no",
        "order_no",
        "order_products",
        "order_quantity",
        "order_status",
        "page_name",
        "page_no",
        "page_num",
        "parent_name",
        "parent_no",
        "parent_type",
        "partner_name",
        "payment_means_name",
        "payment_method_code",
        "payment_method_name",
        "payment_method_type_name",
        "plan_name",
        "plan_no",
        "position_l1",
        "position_l2",
        "position_l3",
        "price_range_maximum",
        "price_range_minimum",
        "product_check_index",
        "product_image_url",
        "product_name",
        "product_no",
        "product_price",
        "product_type",
        "products",
        "promotion_id",
        "rank_no",
        "search_address",
        "search_call_id",
        "search_keyword",
        "search_result_cnt",
        "search_result_num",
        "select_value",
        "seller_name",
        "seller_nickname",
        "seller_no",
        "share_type",
        "shoppingtalk_id",
        "small_category_name",
        "small_category_no",
        "smartoption",
        "sohoshop_name",
        "sort_method",
        "sort_type",
        "specialist_name",
        "specialist_no",
        "start_time",
        "stock_no",
        "store_name",
        "tab_name",
        "tag_name",
        "to_time",
        "today",
        "trace_meta_category_no",
        "trc_no",
        "user_input_search_keyword",
        "view_type",
        "visible",
        "year_month",
        "search_view_type",
        "search_sort_type",
        "search_include_keyword",
        "search_category_no",
        "search_brand_code",
        "search_seller_nos",
        "search_max_price",
        "search_min_price",
        "search_benefit",
        "search_attribute",
        "search_ad_show",
        "search_custom_yn",
        "search_custom_key",
        "search_no_result_yn"
    ];

    var action_key_fields = [
        "page_id","action_id"
    ];


    var shuttle = {};

    function capitalize(str) {
        str = str === null ? '' : String(str);
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    for (var i = 0, headersLength = headers.length; i < headersLength; i++) {

        log.sentinel_meta._$fieldOrder[headers[i]] = i;
        if(headers[i] === "log_version"){
            log[headers[i]] = "17.06.20:1.6.5:9";
        }else{
            log[headers[i]] = "";
            shuttle['set' + capitalize(headers[i])] = (function (header) {
                return function (value) {
                    log[header] = value;
                    return shuttle;
                };
            })(headers[i]);
        }
    }

    for (var i = 0, bodiesLength = bodies.length; i < bodiesLength; i++) {
        shuttle['set' + capitalize(bodies[i])] = (function (body) {
            return function (value) {
                log._$body[body] = value;
                return shuttle;
            };
        })(bodies[i]);
    }

    log._$body = {};
    log.sentinel_meta._$fieldOrder._$body = headers.length;

    for (var i = 0, headersLength = headers.length; i < headersLength; i++) {
        shuttle['get' + capitalize(headers[i])] = (function (header) {
            return function () {
                return log[header];
            };
        })(headers[i]);
    }

    for (var i = 0, bodiesLength = bodies.length; i < bodiesLength; i++) {
        shuttle['get' + capitalize(bodies[i])] = (function (body) {
            return function () {
                return log._$body[body];
            };
        })(bodies[i]);
    }

    /**
     * @deprecated As of Sentinel-Shuttle 1.5.30, use getImmutableJSONObject() instead
     */
    shuttle.get = function () {
        return log;
    };

    shuttle.getImmutableJSONObject = function () {

        var tempParsedJSon=parsedJSon;
        if(tempParsedJSon!=null){
            this.clearBody();
            log._$body=tempParsedJSon;
        }
        var immutable = JSON.parse(JSON.stringify(log));
        return immutable;
    };

    shuttle.getBodyFields = function () {
        return bodies.slice();
    };


    var parsedJSon=null;
    shuttle.setBodyByJSonString = function (bodyByJSonString) {
        this.clearBody();
        try{
            parsedJSon=JSON.parse(bodyByJSonString);
        } catch (e){
            parsedJSon={};
            console.error("Parsing Failed: bodyByJSonString: " + e.message);
        }
    };

    shuttle.getHeaderFields = function() {
        return headers.slice();
    };

    shuttle.getActionKeyFields = function() {
        return action_key_fields.slice();
    }

    shuttle.getFromLog = function (jsonLog) {
        jsonLog["sentinel_meta"] = log.sentinel_meta;
        return jsonLog;
    };

    shuttle.getSentinelMeta = function () {
        return log.sentinel_meta;
    };

    shuttle.toShuttleObject = function(data) {
        for (var i = 0, headersLength = headers.length; i < headersLength; i++) {
            if(data.hasOwnProperty(headers[i])) {
                log[headers[i]] = data[headers[i]];
            }
            else {
                log[headers[i]] = "";
            }
        }

        log["log_version"] = "17.06.20:1.6.5:9";

        for (var i = 0, bodiesLength = bodies.length; i < bodiesLength; i++) {
            if(data.hasOwnProperty(bodies[i])) {
                log._$body[bodies[i]] = data[bodies[i]];
            }
        }

        return log;
    };

    shuttle.clearBody = function () {
        if (log._$body) {
            log._$body = {};
        }
        parsedJSon=null;
        return shuttle;
    };

    var logging = function(message) {
        if (console && console.log) console.log("[SHUTTLE] " + message);
    }



    return shuttle;
}


