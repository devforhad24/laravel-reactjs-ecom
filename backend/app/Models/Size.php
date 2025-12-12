<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    public function product_size(){
        return $this->hasMany(ProductSize::class);
    }
}
