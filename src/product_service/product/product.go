package product

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"os"
)

type Product struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Description string `json:"description"`
	Price float64 `json:"price"`
}

var sql_con *sql.DB

func init()  {
	host := os.Getenv("MYSQL_HOST")
	username := os.Getenv("MYSQL_USER")
	password := os.Getenv("MYSQL_PASSWORD")
	database := os.Getenv("MYSQL_DATABASE")
	var err error
	sql_con, err = sql.Open("mysql", username + ":"+password+"@tcp("+host+")/"+database)
	// if there is an error opening the connection, handle it
	if err != nil {
		panic(err.Error())
	}
}

type CreateProductRequest struct {
	Name string `json:"name"`
	Description string `json:"description"`
	Price float64 `json:"price"`
}

func GetAll() ([]Product, error){
	results, err := sql_con.Query("SELECT id, `name`, description, price FROM product")
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	var products []Product
	for results.Next() {
		var product Product
		err = results.Scan(&product.Id, &product.Name, &product.Description, &product.Price)
		if err != nil {
			panic(err.Error())
		}
		products = append(products, product)
	}
	return products, nil
}

func Get(id int) (Product, error){
	var product Product
	err := sql_con.QueryRow("SELECT id, `name`, description, price FROM product where id = ?", id).Scan(&product.Id, &product.Name, &product.Description, &product.Price)
	if err != nil {
		log.Println(err.Error())
		return product, err
	}
	return product, nil
}

func (c *CreateProductRequest)Create() error{

	insert, err := sql_con.Query("INSERT INTO product (`name`, description, price) VALUES ( ?, ?, ? )", c.Name, c.Description, c.Price)

	if err != nil {
		log.Println(err.Error())
		return err
	}
	defer insert.Close()
	return nil
}

func (c *Product)Update() error{
	update, err := sql_con.Query("UPDATE product SET `name` = ?, description = ?, price = ? WHERE `id` = ?", c.Name, c.Description, c.Price, c.Id)

	if err != nil {
		log.Println(err.Error())
		return err
	}
	defer update.Close()
	return nil
}

func Delete(id int) error {
	delete, err := sql_con.Query("DELETE FROM product WHERE `id` = ?", id)

	if err != nil {
		log.Println(err.Error())
		return err
	}
	defer delete.Close()
	return nil
}