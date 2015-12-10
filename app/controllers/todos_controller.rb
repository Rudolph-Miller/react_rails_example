class TodosController < ApplicationController
  def index
    @todos = Todo.all
    render json: @todos, each_serializer: TodoSerializer
  end
end
