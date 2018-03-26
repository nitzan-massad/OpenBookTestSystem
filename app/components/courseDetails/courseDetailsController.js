/**
 * Created by nitzan on 26/03/18.
 */



app.controller('courseDetailsController', ['$scope','CartService',
    function (productDetailsServics ,$scope,cartService) {
        var self = this;
        self.product = productDetailsServics.getProduct() ;
        self.addToCart = cartService.addToCart;
        self.deleteFromCart=function(product) {
            productDetailsServics.controller.deleteFromCart(product)
        }
    }]);